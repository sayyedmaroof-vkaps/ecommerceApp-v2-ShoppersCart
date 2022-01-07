import React, { useState } from 'react'
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
  const [productsLoading, setProductsLoading] = useState(false)

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
      const { data } = await axios.get(`/api/products/getAll`, {
        params: { limit, skip, keyword, category },
      })
      setProducts(data.products)
      setProductsLoading(false)
      setTotalResults(data.totalResults)
    } catch (err) {
      errorHandler(err, 'could not get products')
    }
  }

  // Add new product
  const addProduct = async fromData => {
    const productBody = clean(fromData)
    try {
      setProductsLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
        'Content-Type': 'multipart/form-data',
      }
      await axios.post('/api/products/add', productBody, { headers })
      enqueueSnackbar('Product added successfully', { variant: 'success' })
      setProductsLoading(false)
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
      return data.product
    } catch (err) {
      errorHandler(err)
    }
  }

  // Update prdouct details
  const updateProductDetails = async (
    id,
    name,
    category,
    brand,
    price,
    countInStock,
    rating,
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
        category,
        brand,
        price,
        countInStock,
        rating,
        description,
      })
      await axios.patch(`/api/products/${id}`, productBody, { headers })
      enqueueSnackbar('Prouduct details updated successfully!', {
        variant: 'success',
      })
      setProductsLoading(false)
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
        `/api/products/${id}/updateImage`,
        formData,
        { headers }
      )
      enqueueSnackbar('Product image updated successfully ', {
        variant: 'success',
      })
      setProductsLoading(false)
      return data.image
    } catch (err) {
      errorHandler(err, 'Could not update image')
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        productsLoading,
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
