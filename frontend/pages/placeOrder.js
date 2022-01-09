import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import CheckoutWizard from '../components/CheckoutWizard'
import Meta from '../components/Meta'
import OrderContext from '../context/orders/orderContext'
import { Store } from '../utils/Store'
import useStyles from '../utils/styles'

const PlaceOrder = () => {
  const classes = useStyles()
  // for order context
  const oContext = useContext(OrderContext)
  const { ordersLoading, placeOrder } = oContext

  const router = useRouter()

  const { state, dispatch } = useContext(Store)
  const { shippingAddress, paymentMethod } = state

  const { items: cartItems, cartTotal: itemsPrice } = useCart()

  const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100 // 123.456 => 123.46
  // const itemsPrice = round2(
  //   cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  // )
  const shippingPrice = itemsPrice >= 200 ? 0 : 15
  const taxPrice = round2(itemsPrice * 0.15)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment')
    }
    if (cartItems.length === 0) {
      router.push('/cart')
    }
  }, [])

  const [orderItems, setOrderItems] = useState([])
  useEffect(() => {
    const newArr = cartItems.map(
      ({
        category,
        createdAt,
        id,
        updatedAt,
        __v,
        _id,
        countInStock,
        rating,
        numReviews,
        ...keep
      }) => ({
        ...keep,
        product: _id,
      })
    )
    setOrderItems(newArr)
    // eslint-disable-next-line
  }, [])

  const handlePlaceOrder = () => {
    placeOrder(
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    )
  }

  return (
    <>
      <Meta title="Place Order" />
      <CheckoutWizard activeStep={3} />
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>

      <Grid container spacing={2}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Shipping Address</Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Payment Method</Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
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
                        <TableCell>
                          <strong>Image</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Name</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Quantity</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Price</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Total</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item._id}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  layout="responsive"
                                  width="100%"
                                  height="100%"
                                />
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item._id}`} passHref>
                              <Link>
                                <Typography variant="h6" color="primary">
                                  {item.name}
                                </Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.price}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.itemTotal}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>

          <List>
            <ListItem>
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={() => router.push('/payment')}>
                Back To Payment Method
              </Button>
            </ListItem>
          </List>
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
                    <Typography align="right">${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${shippingPrice}</Typography>
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
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </ListItem>
              {ordersLoading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false })
