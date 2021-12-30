import axios from 'axios'
// import data from '../utils/data'
import Meta from '../components/Meta'
import { Fragment } from 'react'
import Products from '../components/Products'

export default function Home({ products }) {
  return (
    <Fragment>
      <Meta />
      <Products products={products} />
    </Fragment>
  )
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/getAll?limit=100&skip=0`
    )
    // console.log(data)
    return {
      props: {
        products: data.products,
      },
    }
  } catch (err) {
    console.log(err.response.data)
    return {
      props: {
        products: [],
      },
    }
  }
}
