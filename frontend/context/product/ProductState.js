import React, { useEffect, useState } from 'react'
import ProductContext from './productContext'
import axios from 'axios'

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
  const [products, setProducts] = useState([])
  const [productsError, setProductsError] = useState(null)
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsMessage, setProductsMessage] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setProductsError(null)
      setProductsMessage(null)
    }, 3000)
  }, [productsError, productsMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setProductsError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setProductsError({
        variant: 'danger',
        message: `${info},  No response from server!`,
      })
    } else {
      setProductsError({ variant: 'danger', message: err.message })
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
      setProductsError(null)
      return data.totalResults
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
