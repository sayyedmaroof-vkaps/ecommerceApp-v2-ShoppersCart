import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import CategoryContext from '../../../context/category/categoryContext'
import UserContext from '../../../context/user/UserContext'

const CategoryDetails = ({ params }) => {
  const categoryId = params.categoryId

  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext
  // for category context
  const cContext = useContext(CategoryContext)
  const { updateCategory, getOneCategory } = cContext

  const [category, setCategory] = useState({ title: '' })

  useEffect(() => {
    if (user.role !== 'admin') {
      router.push('/')
    }
    const fetchCategory = async () => {
      const fetchedCategory = await getOneCategory(categoryId)
      setCategory(fetchedCategory)
    }
    fetchCategory()
    // eslint-disable-next-line
  }, [])

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  const handleSaveChanges = e => {
    e.preventDefault()
    const { title } = category
    updateCategory(categoryId, title)
  }

  return (
    <div>
      <Link href="/admin">
        <a className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded d-inline">
          Back to Dashboard
        </a>
      </Link>
      <div className="flex flex-col mt-8">
        <div className="flex items-center justify-center">
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
                      Category Title:
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      name="title"
                      type="text"
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
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  return { props: { params } }
}

export default dynamic(() => Promise.resolve(CategoryDetails), { ssr: false })
