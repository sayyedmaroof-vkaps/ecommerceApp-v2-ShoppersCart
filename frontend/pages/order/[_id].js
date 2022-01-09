import React, { useContext, useEffect, useReducer, useState } from 'react'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import Image from 'next/image'
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  Card,
  List,
  ListItem,
} from '@material-ui/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import useStyles from '../../utils/styles'
import { useSnackbar } from 'notistack'
import Meta from '../../components/Meta'
import UserContext from '../../context/user/UserContext'
import OrderContext from '../../context/orders/orderContext'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Loader from '../../components/Loader'
import { Store } from '../../utils/Store'

function reducer(state, action) {
  switch (action.type) {
    // case 'FETCH_REQUEST':
    //   return { ...state, loading: true, error: '' };
    // case 'FETCH_SUCCESS':
    //   return { ...state, loading: false, order: action.payload, error: '' };
    // case 'FETCH_FAIL':
    //   return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true }
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true }
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload }
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' }
    default:
      state
  }
}

function Order({ params }) {
  const orderId = params._id
  const { enqueueSnackbar } = useSnackbar()
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  const classes = useStyles()
  const router = useRouter()

  const [order, setOrder] = useState({ orderItems: [], shippingAddress: {} })

  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext
  // for order context
  const oContext = useContext(OrderContext)
  const { getOneOrder, ordersLoading } = oContext

  const { state } = useContext(Store)
  const { paymentMethod } = state

  const [{ loading, error, successPay }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  })

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
  }

  useEffect(() => {
    if (!user) {
      return router.push('/login')
    }
    const fetchOrder = async () => {
      const result = await getOneOrder(orderId)
      setOrder(result)
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder()
      if (successPay) dispatch({ type: 'PAY_RESET' })
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(`/api/config/paypal`)
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      loadPaypalScript()
    }
  }, [order, successPay])

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then(orderID => {
        return orderID
      })
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' })
        const userToken = JSON.parse(localStorage.getItem('userToken'))
        const headers = {
          Authorization: `Bearer ${userToken && userToken}`,
        }
        const { data } = await axios.patch(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers,
          }
        )
        dispatch({ type: 'PAY_SUCCESS', payload: data })
        enqueueSnackbar('Order Payment Successful', { variant: 'success' })
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) })
        errorHandler(err)
      }
    })
  }

  function onError(err) {
    errorHandler(err)
  }

  return (
    <>
      <Meta title={`Order ${orderId}`} />
      <Typography component="h1" variant="h1">
        Order: {orderId}
      </Typography>
      {ordersLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {order.shippingAddress.fullName},{' '}
                  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </ListItem>
                <ListItem>
                  Status:{' '}
                  {order.isDelivered
                    ? `delivered at ${new Date(
                        order.deliveredAt
                      ).toLocaleString()}`
                    : 'not delivered'}
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{order.paymentMethod}</ListItem>
                <ListItem>
                  Status:{' '}
                  {order.isPaid
                    ? `paid at ${new Date(order.paidAt).toLocaleString()}`
                    : 'not paid'}
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.orderItems.map(item => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink
                                href={`/product/${item.product}`}
                                passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink
                                href={`/product/${item.product}`}
                                passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>${item.price}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography variant="h2">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${order.itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${order.taxPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        ${order.shippingPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>${order.totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {paymentMethod === 'PayPal' && !order.isPaid && (
                  <ListItem>
                    {isPending ? (
                      <Loader />
                    ) : (
                      <div className={classes.fullWidth}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export async function getServerSideProps({ params }) {
  return { props: { params } }
}

export default dynamic(() => Promise.resolve(Order), { ssr: false })
