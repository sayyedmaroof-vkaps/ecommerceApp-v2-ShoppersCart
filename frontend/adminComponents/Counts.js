import NextLink from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import OrderContext from '../context/orders/orderContext'
import ProductContext from '../context/product/productContext'
import UserContext from '../context/user/UserContext'

const Counts = () => {
  // for user context
  const uContext = useContext(UserContext)
  const { allUsers, getAllUsers } = uContext
  // for order context
  const oContext = useContext(OrderContext)
  const { getAllOrders, orders } = oContext
  // for product context
  const pContext = useContext(ProductContext)
  const { getProducts, totalResults } = pContext

  // const [allProducts, setAllProducts] = useState(0)

  useEffect(() => {
    getAllOrders()
    getAllUsers()

    // const fetchTotalProducts = async () => {
    //   const result = await getProducts(100, 0, '', '')
    //   setAllProducts(result)
    // }
    // fetchTotalProducts()
  }, [])

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <NextLink href="/admin">
        <a>
          <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
            <div className="p-3 bg-red-400 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="mx-4">
              <h4 className="text-2xl font-semibold text-gray-700">
                {totalResults}
              </h4>
              <div className="text-gray-500">All Products</div>
            </div>
          </div>
        </a>
      </NextLink>

      <NextLink href="/admin/orders" passHref>
        <a>
          <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
            <div className="p-3 bg-red-400 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </div>
            <div className="mx-4">
              <h4 className="text-2xl font-semibold text-gray-700">
                {orders.length}
              </h4>
              <div className="text-gray-500">All Orders</div>
            </div>
          </div>
        </a>
      </NextLink>

      <NextLink href="/admin/users" passHref>
        <a>
          <div className="flex items-center px-4 py-6 bg-white rounded-md shadow-md">
            <div className="p-3 bg-red-400 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="mx-4">
              <h4 className="text-2xl font-semibold text-gray-700">
                {allUsers.length}
              </h4>
              <div className="text-gray-500">All Users</div>
            </div>
          </div>
        </a>
      </NextLink>
    </div>
  )
}

export default Counts
