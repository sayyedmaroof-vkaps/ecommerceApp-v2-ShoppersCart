import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useCart } from 'react-use-cart'

const ProductDetails = ({ product }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { addItem, items: cartItems } = useCart()
  const router = useRouter()

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category.title}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    let item = {
                      ...product,
                      id: product._id,
                    }
                    const existItem = cartItems.find(x => x._id === product._id)
                    if (
                      existItem &&
                      product.countInStock <= existItem.quantity
                    ) {
                      window.alert('sorry, the product is out of stock')
                      return
                    }
                    addItem(item, 1)
                    enqueueSnackbar('Product added to cart', {
                      variant: 'info',
                      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                    })
                    router.push('/cart')
                  }}>
                  Add To Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductDetails
