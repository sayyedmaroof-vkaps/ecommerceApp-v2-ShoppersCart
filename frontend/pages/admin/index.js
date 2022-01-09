import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Meta from '../../components/Meta'
import UserContext from '../../context/user/UserContext'
import ProductContext from '../../context/product/productContext'
import CategoryContext from '../../context/category/categoryContext'
import NextLink from 'next/link'
import Counts from '../../adminComponents/Counts'
import Nav from '../../adminComponents/Nav'
import Link from 'next/link'

const Prodcuts = () => {
  const router = useRouter()
  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext
  // for Product context
  const pContext = useContext(ProductContext)
  const { products, getProducts, totalResults } = pContext
  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  const limit = 4
  const [skip, setSkip] = useState(0)
  const [keyWord, setKeyWord] = useState('')
  // const [category, setCategory] = useState('')
  //   const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    getProducts(limit, skip, keyWord)

    // eslint-disable-next-line
  }, [skip, limit])

  useEffect(() => {
    if (user.role !== 'admin') {
      router.push('/')
    }
    getCategories()
    // getProducts(1, 1, '', '')
    // getAllUsers()
  }, [])

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit)
    }
  }

  const handleNextClick = async () => {
    setSkip(skip + limit)
  }

  const handleChange = e => {
    setKeyWord(e.target.value)
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyWord))
    }
    setSkip(0)
    populateProducts()
  }

  return (
    <>
      <Meta title="Admin Dashboard" />
      <div className="flex h-auto">
        <Nav activeScreen="products" />
        <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
          <div className="container mx-auto mt-12">
            <Counts />
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <h3 className="text-2xl text-black font-bold">
                  All Categories
                </h3>
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Id
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Title
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Date
                        </th>

                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {categories.map(category => (
                        <tr key={category._id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 font-semibold text-gray-600">
                              {category._id.substring(20, 24)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm   ">
                              <span className=" font-semibold leading-5  p-1 text-red-800 bg-green-100 rounded">
                                {category.title}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-500">
                              {new Date(category.createdAt).toLocaleString()}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <Link
                              href={`/admin/categoryDetails/${category._id}`}
                              passHref>
                              <button className="border-gray-400 text-black border-2 rounded-md p-1 px-2 hover:bg-slate-600">
                                Details
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <h3 className="text-2xl text-black font-bold">All Products</h3>
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Id
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Name
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Brand
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Category
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Price
                        </th>

                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {products.map(product => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-xs leading-5 font-semibold text-gray-600">
                              {product._id.substring(20, 24)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900 font-bold">
                              {product.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  text-gray-900">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5  bg-green-100 rounded-full">
                              {product.brand}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span
                              className={`inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full`}>
                              {product.category.title}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <div className="font-bold leading-5 text-gray-800">
                              ${product.price}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              <Link
                                href={`/admin/productDetails/${product._id}`}
                                passHref>
                                <button className="border-gray-400 text-black border-2 rounded-md p-1 px-2 hover:bg-slate-600">
                                  Details
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="row mx-3">
                    <div className="col-md-12 text-center">
                      <div className="flex justify-between align-center my-3">
                        <button
                          variant="success"
                          className="shadow bg-green-500  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:bg-green-300"
                          size="sm"
                          onClick={handlePreviousClick}
                          disabled={skip < 1}>
                          &larr; Previous
                        </button>

                        <div className="text-center mx-2">
                          Page-{skip / limit + 1},
                          <span className="text-muted">
                            {' '}
                            Showing {products.length} out of {totalResults}{' '}
                            products.
                          </span>
                        </div>

                        <button
                          variant="success"
                          className="shadow bg-green-500  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:bg-green-300"
                          size="sm"
                          onClick={handleNextClick}
                          disabled={totalResults - skip <= limit}>
                          Next &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Prodcuts
