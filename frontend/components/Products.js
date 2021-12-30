import NextLink from 'next/link'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import { useCart } from 'react-use-cart'
import { useRouter } from 'next/router'

const Products = ({ products }) => {
  const router = useRouter()
  const { addItem, items: cartItems } = useCart()

  return (
    <>
      <h1>Products</h1>
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
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button
                  size="small"
                  color="primary"
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
