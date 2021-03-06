import React, { useState } from 'react'
import OrderContext from './orderContext'
import axios from 'axios'
import { useCart } from 'react-use-cart'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

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
const OrderState = props => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { emptyCart } = useCart()

  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [myOrders, setMyOrders] = useState([])

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
    setOrdersLoading(false)
  }

  // -----------------------------------------
  // Place new order
  //   ---------------------------------------
  const placeOrder = async (
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
  ) => {
    const orderBody = clean({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    })
    try {
      setOrdersLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      const { data } = await axios.post(`/api/orders/new`, orderBody, {
        headers,
      })
      enqueueSnackbar('Order Placed Successfully', { variant: 'success' })
      emptyCart()
      router.push(`/order/${data.order._id}`)
      setOrdersLoading(false)
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
      const { data } = await axios.get(`/api/orders/getAll`, { headers })
      setOrders(data.orders)
      setOrdersLoading(false)
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
      const { data } = await axios.get(`/api/orders/myOrders`, { headers })
      setMyOrders(data.myOrders)
      setOrdersLoading(false)
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
        ordersLoading,
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

export default OrderState
