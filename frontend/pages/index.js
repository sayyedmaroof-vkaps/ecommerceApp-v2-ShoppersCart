import axios from 'axios'
import Meta from '../components/Meta'
import { Fragment, useContext, useEffect, useState } from 'react'
import Products from '../components/Products'
import CategoryContext from '../context/category/categoryContext'
import ProductContext from '../context/product/productContext'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import useStyles from '../utils/styles'

export default function Home({ products: productsFromProps }) {
  const classes = useStyles()

  const [products, setProducts] = useState(productsFromProps)

  const limit = 5
  const [skip, setSkip] = useState(0)
  const [keyWord, setKeyWord] = useState('')
  const [category, setCategory] = useState('')

  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext
  // for product context
  const pContext = useContext(ProductContext)
  const { getProducts, products: productsFromContext, totalResults } = pContext

  useEffect(() => {
    const populateProducts = async () => {
      await getProducts(limit, skip, keyWord, category)
    }
    populateProducts()
    setProducts(productsFromContext)
    getCategories()
    // eslint-disable-next-line
    // setProducts(productsFromContext)
  }, [skip, limit, category])

  const handleChange = e => {
    setKeyWord(e.target.value)
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    setSkip(0)
    setCategory('')
    getProducts(limit, skip, keyWord, category)
  }

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit)
    }
  }

  const handleNextClick = async () => {
    setSkip(skip + limit)
  }

  // useEffect(() => {
  //   getProducts(limit, skip, keyWord, category)
  //   setProducts(productsFromContext)
  // }, [limit, skip, keyWord])

  console.log(skip)

  return (
    <Fragment>
      <Meta />
      <div className="flex items-center justify-between my-4">
        <Typography variant="h1" element="h1">
          Products
        </Typography>
        <div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex justify-between items-center">
            <TextField
              id="outlined-name"
              size="small"
              label="Search Products"
              variant="outlined"
              name="keyWord"
              onChange={handleChange}
              value={keyWord}
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="outlined"
              className={classes.searchBtn}>
              Search
            </Button>
          </form>
        </div>
        <FormControl variant="filled" className={classes.filterDropdown}>
          <InputLabel id="demo-simple-select-filled-label">
            Filter Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={category}
            onChange={() => {}}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Products products={products} />

      <div className="flex justify-between items-center my-3">
        <Button
          variant="contained"
          size="small"
          onClick={handlePreviousClick}
          disabled={skip < 1}>
          &larr; Previous
        </Button>

        <div className="text-center mx-2">
          Page-{skip / limit + 1},
          <span className="text-muted">
            {' '}
            Showing {products.length} out of {totalResults} products.
          </span>
        </div>

        <Button
          variant="contained"
          size="small"
          onClick={handleNextClick}
          disabled={totalResults - skip <= limit}>
          Next &rarr;
        </Button>
      </div>
    </Fragment>
  )
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/getAll?limit=5&skip=0`
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
