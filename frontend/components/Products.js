import NextLink from 'next/link'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core'
import { useCart } from 'react-use-cart'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import useStyles from '../utils/styles'

const Products = ({ products }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { addItem, items: cartItems } = useCart()

  return (
    <>
      <Typography variant="h1" element="h1">
        Products
      </Typography>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item md={4} key={product.name}>
            <Card>
              <NextLink href={`/product/${product._id}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  />
                  <CardContent className="flex justify-start items-center">
                    <Typography variant="h6" className={classes.disableSpacing}>
                      {product.name}
                    </Typography>
                    <Chip
                      label={product.category.title}
                      color="primary"
                      variant="default"
                      size="small"
                      className={classes.chipStyle}
                    />
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions className="flex items-center justify-between">
                <Typography
                  element="h2"
                  variant="h2"
                  className={classes.disableSpacing}>
                  ${product.price}
                </Typography>

                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    let item = {
                      ...product,
                      id: product._id,
                    }
                    const existItem = cartItems.find(x => x._id === product._id)
                    if (existItem && product.countInStock <= existItem.quantity)
                      return enqueueSnackbar(
                        'sorry, the product is out of stock',
                        { variant: 'warning' }
                      )

                    addItem(item, 1)
                    enqueueSnackbar('Product added to cart', {
                      variant: 'info',
                      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                    })
                    router.push('/cart')
                  }}>
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Products
