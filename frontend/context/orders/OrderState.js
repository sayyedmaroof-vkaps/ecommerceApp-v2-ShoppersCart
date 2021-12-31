import React, { useEffect, useState } from 'react'
import OrderContext from './orderContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'

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
// Orders State
// ------------------------------------------
const OdersState = props => {
  const navigate = useNavigate()

  const { emptyCart } = useCart()

  const [orders, setOrders] = useState([])
  const [ordersError, setOrdersError] = useState(null)
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersMessage, setOrdersMessage] = useState(null)
  const [myOrders, setMyOrders] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setOrdersError(null)
      setOrdersMessage(null)
    }, 3000)
  }, [ordersError, ordersMessage])

  // Error Handler function
  const errorHandler = (err, info) => {
    if (err.response) {
      setOrdersError({
        variant: 'danger',
        message: `${info}, ${err.response.data.error}`,
      })
    } else if (err.request) {
      setOrdersError({
        variant: 'danger',
        message: `${info},  No response from server!`,
      })
    } else {
      setOrdersError({ variant: 'danger', message: err.message })
    }
    setOrdersLoading(false)
  }

  // -----------------------------------------
  // Place new order
  //   ---------------------------------------
  const placeOrder = async (
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentResult
  ) => {
    const orderBody = clean({
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentResult,
    })
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setOrdersLoading(true)
      await axios.post('api/orders/new', orderBody, { headers })
      // localStorage.removeItem('react-use-cart')
      emptyCart()
      navigate('/thankYou')
      // setProducts([...products, productBody])
      setOrdersMessage({
        variant: 'success',
        message: 'Order placed successfully!',
      })
      setOrdersLoading(false)
      setOrdersError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------
  //  Get all orders
  //   ---------------------------------------
  const getAllOrders = async () => {
    try {
      setOrdersLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const { data } = await axios.get('/api/orders/getAll', { headers })
      setOrders(data.orders)
      setOrdersLoading(false)
      setOrdersError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------
  //  Get my orders
  //   ---------------------------------------
  const getMyOrders = async () => {
    try {
      setOrdersLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const { data } = await axios.get('/api/orders/myOrders', { headers })
      setMyOrders(data.myOrders)
      setOrdersLoading(false)
      setOrdersError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------
  //  Get One order
  //   ---------------------------------------
  const getOneOrder = async id => {
    try {
      setOrdersLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const { data } = await axios.get(`/api/orders/myOrders/${id}`, {
        headers,
      })
      setOrdersLoading(false)
      setOrdersError(null)
      return data.order
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------
  //  Get One order admin
  //   ---------------------------------------
  const getOneOrderAdmin = async id => {
    try {
      setOrdersLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers,
      })
      setOrdersLoading(false)
      setOrdersError(null)
      return data.order
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        placeOrder,
        orders,
        ordersError,
        ordersLoading,
        ordersMessage,
        myOrders,
        getAllOrders,
        getMyOrders,
        getOneOrder,
        getOneOrderAdmin,
      }}>
      {props.children}
    </OrderContext.Provider>
  )
}

export default OdersState
