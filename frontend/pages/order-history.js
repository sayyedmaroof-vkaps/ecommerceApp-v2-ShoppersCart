import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Meta from '../components/Meta'
import OrderContext from '../context/orders/orderContext'
import UserContext from '../context/user/UserContext'
import NextLink from 'next/link'
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  TableContainer,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  ListItemText,
} from '@material-ui/core'
import useStyles from '../utils/styles'

const OrderHistory = () => {
  const classes = useStyles()
  const router = useRouter()
  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext
  // for order context
  const oContext = useContext(OrderContext)
  const { getMyOrders, myOrders, ordersLoading } = oContext

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
    getMyOrders()
  }, [])

  return (
    <>
      <Meta title="Order History" />
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Order History
                </Typography>
              </ListItem>
              <ListItem>
                {ordersLoading ? (
                  <CircularProgress />
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>PAID</TableCell>
                          <TableCell>DELIVERED</TableCell>
                          <TableCell>ACTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {myOrders.map(order => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 24)}</TableCell>
                            <TableCell>
                              {new Date(order.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>
                              {order.isPaid
                                ? `paid at ${new Date(
                                    order.paidAt
                                  ).toLocaleString()}`
                                : 'not paid'}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : 'not delivered'}
                            </TableCell>
                            <TableCell>
                              <NextLink href={`/order/${order._id}`} passHref>
                                <Button variant="contained">Details</Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false })
