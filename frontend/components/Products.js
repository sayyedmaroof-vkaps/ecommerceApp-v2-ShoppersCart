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

const Products = ({ products }) => {
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
                  <CardContent>
                    <Typography element="span" variant="button">
                      {product.name}
                    </Typography>
                    <Chip label={product.category.title} color="inherit" />
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>

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
                  <strong>Add To Cart</strong>
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
