import { Chip, Link, Typography } from '@material-ui/core'
import NextLink from 'next/link'
import { Fragment } from 'react'
import Meta from '../../components/Meta'
import useStyles from '../../utils/styles'
import axios from 'axios'
import ProductDetails from '../../components/ProductDetails'

const ProductScreen = ({ product }) => {
  const classes = useStyles()

  if (!product) return <div>Product not found</div>

  return (
    <Fragment>
      <Meta title={product.name} description={product.description} />
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography variant="button" element="button">
              <Chip
                variant="outlined"
                color="primary"
                label="Back to products"
              />
            </Typography>
          </Link>
        </NextLink>
      </div>
      <ProductDetails product={product} />
    </Fragment>
  )
}

export default ProductScreen

export async function getServerSideProps({ params }) {
  const { _id } = params
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${_id}`
    )
    return {
      props: {
        product: data.product,
      },
    }
  } catch (err) {
    console.log(err.response.data)
    return {
      props: {
        product: null,
      },
    }
  }
}
