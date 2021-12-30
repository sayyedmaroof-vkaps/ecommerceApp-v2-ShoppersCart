import {
  Box,
  Button,
  Card,
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
import dynamic from 'next/dynamic'
import Image from 'next/image'
import NextLink from 'next/link'
import { useCart } from 'react-use-cart'
import Meta from '../components/Meta'

const CartScreen = () => {
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
        <div>
          Cart is empty.{' '}
          <NextLink href="/" passHref>
            <Link>Go Shopping</Link>
          </NextLink>
        </div>
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
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Remove</TableCell>
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
                              width={50}
                              height={50}
                            />
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/product/${item._id}`} passHref>
                          <Link>
                            <Typography color="secondary">
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
                          style={{ backgroundColor: '#ff860a' }}
                          color="inherit"
                          onClick={() => removeItem(item.id)}>
                          x
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
                  <Button fullWidth variant="contained">
                    Checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={12}>
            <Box textAlign="center" my={3}>
              <NextLink href="/" passHref>
                <Link>Continue Shopping</Link>
              </NextLink>
            </Box>
            <Box textAlign="center" my={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => emptyCart()}>
                Empty Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
