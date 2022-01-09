import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import CategoryContext from '../../../context/category/categoryContext'
import ProductContext from '../../../context/product/productContext'
import UserContext from '../../../context/user/UserContext'

const ProductDetails = ({ params }) => {
  const productId = params.productId

  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext
  // for product context
  const pContext = useContext(ProductContext)
  const { getOneProduct, updateProductDetails, updateProductImage } = pContext
  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  const [imageFile, setImageFile] = useState(null)

  const [product, setProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    countInStock: '',
    rating: '',
    description: '',
  })

  const [image, setImage] = useState(null)

  useEffect(() => {
    if (user.role !== 'admin') {
      router.push('/')
    }
    const fetchProduct = async () => {
      const fetchedProduct = await getOneProduct(productId)
      // console.log(fetchedProduct)
      setProduct(fetchedProduct)
      setImage(fetchedProduct.image)
    }
    fetchProduct()
    getCategories()
    // eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSaveChanges = e => {
    e.preventDefault()
    // console.log(product)
    const { name, category, brand, price, countInStock, rating, description } =
      product
    updateProductDetails(
      productId,
      name,
      category,
      brand,
      price,
      countInStock,
      rating,
      description
    )
  }

  const handleUpdateImage = async () => {
    const formData = new FormData()
    formData.append('image', imageFile)

    console.log('Add product to run')
    const imagePath = await updateProductImage(productId, formData)
    setImage(imagePath)

    console.log('update  product image  ran')

    setImageFile(null)
  }

  return (
    <Fragment>
      <Link href="/admin">
        <a className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded d-inline">
          Back to Dashboard
        </a>
      </Link>
      <div className="flex flex-col mt-8">
        <div className="flex">
          <div className="w-2/3 px-4 py-2 bg-gray-200 ">
            <h3 className="text-2xl text-black font-bold">Product Details</h3>
            <div className="inline-block  min-w-full overflow-hidden align-middle border-b border-gray-700 shadow sm:rounded-lg">
              <form
                className="min-w-full px-3 my-4"
                onSubmit={handleSaveChanges}>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name">
                      Product Name:
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      name="name"
                      type="text"
                      value={product.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name">
                      Category:
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select
                      className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      name="category"
                      onChange={handleChange}>
                      <option value={product.category._id}>
                        {product.category.title}
                      </option>
                      {categories.map(item => (
                        <option key={item._id} value={item._id}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name">
                      Brand:
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      name="brand"
                      onChange={handleChange}
                      value={product.brand}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name">
                      Price:
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      name="price"
                      onChange={handleChange}
                      value={product.price}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name">
                      Count In Stock:
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      name="countInStock"
                      onChange={handleChange}
                      value={product.countInStock}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name">
                      Rating:
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="text"
                      name="rating"
                      onChange={handleChange}
                      value={product.rating}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name">
                      Description:
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <textarea
                      className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      name="description"
                      onChange={handleChange}
                      value={product.description}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3" />
                  <div className="md:w-2/3">
                    <button
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-1/3 py-2 my-2 mx-auto overflow-x-auto  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 ">
            <div className="container  mx-auto">
              <h1 className="text-2xl text-center  text-black font-bold">
                Image
              </h1>
              <div className="w-full rounded">
                <img src={image} alt="image" />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name">
                  Select Image:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="file"
                  name="image"
                  onChange={e => setImageFile(e.target.files[0])}
                />
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 3MB</p>
              </div>
            </div>
            <div className="flex ">
              <button
                disabled={!imageFile}
                onClick={handleUpdateImage}
                className="shadow mx-auto bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:bg-purple-300">
                Update Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export async function getServerSideProps({ params }) {
  return { props: { params } }
}

export default dynamic(() => Promise.resolve(ProductDetails), { ssr: false })
