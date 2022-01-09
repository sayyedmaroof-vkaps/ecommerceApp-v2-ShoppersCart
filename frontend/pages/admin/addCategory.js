import React, { useContext, useEffect, useState } from 'react'
import Counts from '../../adminComponents/Counts'
import Nav from '../../adminComponents/Nav'
import Meta from '../../components/Meta'
import CategoryContext from '../../context/category/categoryContext'
import ProductContext from '../../context/product/productContext'

const AddCategory = () => {
  // for product context
  //   const pContext = useContext(ProductContext)
  //   const { addProduct } = pContext

  // for category context
  const cContext = useContext(CategoryContext)
  const { addCategory } = cContext

  const [category, setCategory] = useState({ title: '' })

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  const handleAddCategory = async e => {
    e.preventDefault()
    await addCategory(category.title)
    setCategory({ title: '' })
  }

  return (
    <>
      <Meta title="Admin Dashboard" />
      <div className="flex h-auto">
        <Nav activeScreen="addCategory" />
        <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
          <div className="container mx-auto mt-12">
            <Counts />
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <h3 className="text-2xl text-black font-bold">
                  Add New Category
                </h3>
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-700 shadow sm:rounded-lg">
                  <form
                    className="min-w-full my-4"
                    onSubmit={handleAddCategory}>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name">
                          Title :
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 placeholder:text-stone-900"
                          id="inline-full-name"
                          name="title"
                          type="text"
                          placeholder="Enter cetegory title"
                          value={category.title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="md:flex md:items-center">
                      <div className="md:w-1/3" />
                      <div className="md:w-2/3">
                        <button
                          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit">
                          Add Category
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

export default AddCategory
