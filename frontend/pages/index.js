import NextLink from 'next/link'
import axios from 'axios'
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
import data from '../utils/data'
import Meta from '../components/Meta'
import { Fragment } from 'react'

export default function Home({ products }) {
  return (
    <Fragment>
      <Meta />
      <h1>Products</h1>
      <Grid container spacing={3}>
        {data.products.map(product => (
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
                <Button size="small" color="primary">
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get('api/products/getAll?limit=100&skip=0')
    console.log(data)
    return {
      props: {
        products: data.products,
      },
    }
  } catch (err) {
    console.log(err.response.data.message)
    return {
      props: {},
    }
  }
}
