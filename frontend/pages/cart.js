import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import {
  CheckOutlined,
  MoveToInbox,
  Payment,
  RemoveShoppingCart,
} from '@material-ui/icons'
// import AccessTimeIcon from '@mui/icons-material/AccessTime'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
// import { RemoveShoppingCart } from '@mui/icons-material'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import Meta from '../components/Meta'

const CartScreen = () => {
  const router = useRouter()

  const {
    items: cartItems,
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart()

  return (
    <>
      <Meta title="shopping cart" />
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {isEmpty ? (
        <Typography variant="h2" component="h1">
          Cart is empty. <RemoveShoppingCartIcon />
          <NextLink href="/" passHref>
            <Link>Go Shopping</Link>
          </NextLink>
        </Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Typography variant="h6">
              Cart has ({totalUniqueItems}) products and total items are ({' '}
              {totalItems}) in the cart.
            </Typography>
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
                    <TableCell align="right">
                      <strong>Remove</strong>
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
                        <Select
                          value={item.quantity}
                          onChange={e =>
                            updateItemQuantity(item.id, e.target.value)
                          }>
                          {[...Array(item.countInStock).keys()].map(x => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">${item.itemTotal}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItem(item.id)}>
                          <RemoveShoppingCart />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal ({totalItems} items): ${cartTotal}.00
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/shipping')}>
                    Proceed Checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={12}>
            <Box textAlign="center" my={3}>
              <NextLink href="/" passHref>
                <Chip
                  clickable
                  label="Continue Shopping"
                  variant="outlined"
                  color="primary"
                />
              </NextLink>
            </Box>
            <Box textAlign="center" my={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => emptyCart()}>
                Empty Cart
                <RemoveShoppingCartIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
