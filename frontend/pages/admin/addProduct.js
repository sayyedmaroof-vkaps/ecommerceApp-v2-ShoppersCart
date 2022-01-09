import React, { useContext, useEffect, useState } from 'react'
import Counts from '../../adminComponents/Counts'
import Nav from '../../adminComponents/Nav'
import Meta from '../../components/Meta'
import CategoryContext from '../../context/category/categoryContext'
import ProductContext from '../../context/product/productContext'

const AddProduct = () => {
  // for product context
  const pContext = useContext(ProductContext)
  const { addProduct } = pContext

  // for category context
  const cContext = useContext(CategoryContext)
  const { categories, getCategories } = cContext

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line
  }, [])

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

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleAddProduct = e => {
    e.preventDefault()
    const { name, category, brand, price, countInStock, rating, description } =
      product
    const formData = new FormData()
    formData.append('image', image)
    formData.append('name', name)
    formData.append('category', category)
    formData.append('brand', brand)
    formData.append('price', price)
    formData.append('countInStock', countInStock)
    formData.append('rating', rating)
    formData.append('description', description)
    console.log('Add product to run')
    addProduct(formData)
    setProduct({
      name: '',
      category: '',
      brand: '',
      price: '',
      countInStock: '',
      rating: '',
      description: '',
    })
    setImage('')
  }

  return (
    <>
      <Meta title="Admin Dashboard" />
      <div className="flex h-auto">
        <Nav activeScreen="addProduct" />
        <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
          <div className="container mx-auto mt-12">
            <Counts />
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <h3 className="text-2xl text-black font-bold">
                  Add New Product
                </h3>
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-700 shadow sm:rounded-lg">
                  <form
                    className="min-w-full px-4 my-4"
                    onSubmit={handleAddProduct}>
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
                          id="grid-state"
                          name="category"
                          onChange={handleChange}>
                          <option>Select Category</option>
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
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name">
                          Image:
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="file"
                          name="image"
                          onChange={e => setImage(e.target.files[0])}
                        />
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                    <div className="md:flex md:items-center">
                      <div className="md:w-1/3" />
                      <div className="md:w-2/3">
                        <button
                          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit">
                          Add Product
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
