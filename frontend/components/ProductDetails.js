import {
  Button,
  Card,
  Chip,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core'
import { AddShoppingCartSharp, Star } from '@material-ui/icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useCart } from 'react-use-cart'
import useStyles from '../utils/styles'
import Rating from './Rating'

const ProductDetails = ({ product }) => {
  const classes = useStyles()
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
              <Typography>
                Category:{' '}
                <Chip
                  label={product.category.title}
                  color="primary"
                  variant="default"
                  size="small"
                  className={classes.chipStyle}
                />
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Brand: <Chip label={product.brand} />
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <Rating value={product.rating} text={product.numReviews} />
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Description</strong>: {product.description}
              </Typography>
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
                      return enqueueSnackbar(
                        'sorry, the product is out of stock',
                        { variant: 'warning' }
                      )
                    }
                    addItem(item, 1)
                    enqueueSnackbar('Product added to cart', {
                      variant: 'info',
                      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                    })
                    router.push('/cart')
                  }}>
                  <AddShoppingCartSharp className="mx-3" /> Add To Cart
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
