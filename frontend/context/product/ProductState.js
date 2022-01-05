import React, { useEffect, useState } from 'react'
import ProductContext from './productContext'
import axios from 'axios'
import { useSnackbar } from 'notistack'

// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

// ------------------------------------------
// Product State
// ------------------------------------------
const ProductState = props => {
  const { enqueueSnackbar } = useSnackbar()

  const [products, setProducts] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [productsError, setProductsError] = useState(null)
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsMessage, setProductsMessage] = useState(null)

  // Error handler funtion
  const errorHandler = (err, info) => {
    if (info === undefined || null) {
      info = ''
    }
    if (err.response) {
      enqueueSnackbar(`${info} ${err.response.data.error}`, {
        variant: 'error',
      })
    } else if (err.request) {
      enqueueSnackbar(`${info} No response from server`, {
        variant: 'error',
      })
    } else {
      enqueueSnackbar(err.message, { variant: 'error' })
    }
    setProductsLoading(false)
  }

  // get all Products
  const getProducts = async (limit, skip, keyword, category) => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/getAll`,
        {
          params: { limit, skip, keyword, category },
        }
      )
      setProducts(data.products)
      setProductsLoading(false)
      setProductsError(null)
      setTotalResults(data.totalResults)
    } catch (err) {
      errorHandler(err, 'could not get products')
    }
  }

  // Add new product
  const addProduct = async fromData => {
    const productBody = clean(fromData)
    console.log(productBody, ' productBody')
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      setProductsLoading(true)
      await axios.post('api/products/add', productBody, { headers })
      // setProducts([productBody, ...products])
      setProductsMessage({
        variant: 'success',
        message: 'Product added successfully!',
      })
      setProductsLoading(false)
      setProductsError(null)
    } catch (err) {
      errorHandler(err, 'Could not add product')
    }
  }

  // get one product
  const getOneProduct = async id => {
    try {
      setProductsLoading(true)
      const { data } = await axios.get(`/api/products/${id}`)
      setProductsLoading(false)
      setProductsError(null)
      return data.product
    } catch (err) {
      errorHandler(err)
    }
  }

  // Update prdouct details
  const updateProductDetails = async (
    id,
    name,
    sku,
    category,
    price,
    description
  ) => {
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const productBody = clean({
        name,
        sku,
        category,
        price,
        description,
      })
      await axios.patch(`/api/products/${id}`, productBody, { headers })
      setProductsMessage({
        variant: 'success',
        message: 'Product details updated!',
      })
      setProductsLoading(false)
      setProductsError(null)
      // getCategories()
    } catch (err) {
      errorHandler(err, 'could not update product details')
    }
  }

  // Update prdouct Image
  const updateProductImage = async (id, formData) => {
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      const { data } = await axios.patch(
        `api/products/${id}/updateImage`,
        formData,
        { headers }
      )
      setProductsMessage({
        variant: 'success',
        message: 'Product Image updated!',
      })
      setProductsLoading(false)
      setProductsError(null)
      return data.image
    } catch (err) {
      errorHandler(err, 'Could not update image')
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        productsError,
        productsLoading,
        productsMessage,
        totalResults,
        addProduct,
        getProducts,
        getOneProduct,
        updateProductDetails,
        updateProductImage,

        errorHandler,
      }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState
