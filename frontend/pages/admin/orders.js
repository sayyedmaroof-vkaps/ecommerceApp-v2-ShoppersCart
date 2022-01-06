import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Meta from '../../components/Meta'
import OrderContext from '../../context/orders/orderContext'
import UserContext from '../../context/user/UserContext'
import NextLink from 'next/link'
import Counts from '../../adminComponents/Counts'
import Nav from '../../adminComponents/Nav'

const Orders = () => {
  const router = useRouter()
  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext
  // for order context
  const oContext = useContext(OrderContext)
  const { getAllOrders, orders, ordersLoading } = oContext

  useEffect(() => {
    if (user.role !== 'admin') {
      router.push('/')
    }
    getAllOrders()
  }, [])

  return (
    <>
      <Meta title="Admin Dashboard" />
      <div className="flex h-auto">
        <Nav />
        <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
          <div className="container mx-auto mt-12">
            <Counts />
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto  sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <h3 className="text-2xl text-black font-bold">Latest Orders</h3>
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Order Id
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          User
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Payment Method
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Payment Status
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Items Price
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Total Price
                        </th>
                        <th className="px-6 py-3 text-xs  leading-4 tracking-wider text-left text-black font-bold uppercase border-b border-gray-200 bg-gray-50">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {orders.map(order => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 font-semibold text-gray-600">
                              {order._id.substring(20, 24)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {order.user.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  text-gray-900">
                            <span className="inline-flex px-2 text-xs font-semibold leading-5  bg-green-100 rounded-full">
                              {order.paymentMethod}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span
                              className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                order.isPaid
                                  ? 'text-green-800 bg-green-100'
                                  : 'text-red-800 bg-red-100'
                              } rounded-full`}>
                              {order.isPaid
                                ? `Paid at ${new Date(
                                    order.paidAt
                                  ).toLocaleDateString()}`
                                : 'Not paid'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-500">
                              {order.itemsPrice}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {order.totalPrice}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              <button className="border-gray-400 text-black border-2 rounded-md p-1 hover:bg-slate-600">
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
