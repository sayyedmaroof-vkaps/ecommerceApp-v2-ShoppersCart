import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Meta from '../../../components/Meta'
import OrderContext from '../../../context/orders/orderContext'
import UserContext from '../../../context/user/UserContext'
import { Store } from '../../../utils/Store'

const OrderDetails = ({ params }) => {
  const { orderId } = params
  const router = useRouter()

  const [order, setOrder] = useState({
    user: {},
    orderItems: [],
    shippingAddress: {},
    paymentResult: {},
  })

  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext
  // for product context
  const oContext = useContext(OrderContext)
  const { getOneOrderAdmin } = oContext

  const { state } = useContext(Store)
  const { paymentMethod } = state

  console.log(paymentMethod)

  useEffect(() => {
    if (user.role !== 'admin') {
      router.push('/')
    }
    const fetchOrder = async () => {
      const fetchedOrder = await getOneOrderAdmin(orderId)
      setOrder(fetchedOrder)
    }
    fetchOrder()
    // eslint-disable-next-line
  }, [])

  console.log(order)

  return (
    <div className="scree ">
      <Meta title="Admin Dashboard" />
      <Link href="/admin/orders">
        <a className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded d-inline">
          Back to Dashboard
        </a>
      </Link>
      <div className="py-12">
        <div className="max-w-md mx-auto  shadow-lg rounded-lg md:max-w-5xl">
          <div className="md:flex ">
            <div className="w-full p-4 px-5 py-5">
              <div className="md:grid md:grid-cols-3 gap-2 ">
                <div className="col-span-2 p-5">
                  <h1 className="text-xl font-medium ">
                    Order Id: {order._id}
                  </h1>
                  <h2 className="text-lg font-medium ">
                    Ordered by {order.user.name}
                  </h2>
                  {order.orderItems.map(item => (
                    <div
                      className="flex justify-between items-center mt-6 pt-6"
                      key={item._id}>
                      <div className="flex items-center">
                        {' '}
                        <img
                          src={item.image}
                          width={60}
                          className="rounded-full "
                        />
                        <div className="flex flex-col ml-3">
                          {' '}
                          <span className="md:text-md font-medium">
                            {item.name}
                          </span>{' '}
                          <span className="text-xs font-light text-gray-400">
                            {item.brand}
                          </span>{' '}
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="pr-8 flex ">
                          <span className="text-sm">{item.quantity}</span>
                        </div>
                        <div className="pr-8 flex ">
                          <span className="text-sm"> x </span>
                        </div>
                        <div className="pr-8 flex ">
                          <span className="text-sm">${item.price}</span>
                        </div>
                        <div className="pr-8 ">
                          {' '}
                          <span className="text-sm font-semibold text-gray-800 ">
                            {' '}
                            ${item.itemTotal}
                          </span>{' '}
                        </div>
                        <div>
                          {' '}
                          <i className="fa fa-close text-xs font-medium" />{' '}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t">
                    <div className="flex items-center">
                      {' '}
                      <i className="fa fa-arrow-left text-sm pr-2" />{' '}
                      <span className="text-md font-medium text-blue-500"></span>{' '}
                    </div>
                    <div className="flex justify-center items-end">
                      {' '}
                      <span className="text-sm font-medium text-gray-400 mr-1">
                        Subtotal:
                      </span>{' '}
                      <span className="text-lg font-bold text-gray-800 ">
                        {' '}
                        ${order.itemsPrice}
                      </span>{' '}
                    </div>
                  </div>
                </div>
                <div className=" p-5 bg-gray-700 rounded overflow-visible">
                  <span className="text-xl font-medium text-gray-100 block pb-3">
                    Order Summary
                  </span>{' '}
                  <div className="flex text-white">
                    <div className="w-1/2">
                      <p className="my-4">Order Items :</p>
                      <p className="my-4">Tax :</p>
                      <p className="my-4">Shipping :</p>
                      <hr />
                      <p className="my-4">
                        <strong> Total:</strong>
                      </p>
                    </div>
                    <div className="w-1/2 text-right">
                      <p className="my-4">${order.itemsPrice}</p>
                      <p className="my-4">${order.taxPrice}</p>
                      <p className="my-4">${order.shippingPrice}</p>
                      <hr />
                      <p className="my-6">
                        <strong>${order.totalPrice}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto  shadow-lg rounded-lg md:max-w-5xl">
          <div className="md:flex m-5">
            <div className="md:w-1/2">
              <span className="text-xl font-medium  block pb-3">
                Shipping address
              </span>{' '}
              <p className="my-3">
                Full Name: {order.shippingAddress.fullName}
              </p>
              <p className="my-3">
                Full Address: {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.country}
              </p>
              <p className="my-3">
                Postal Code: {order.shippingAddress.postalCode}
              </p>
              <p className="my-3">
                Status: {order.isDelivered ? 'Delivered' : 'Not Delivered'}
              </p>
            </div>
            <div className="md:w-1/2 md:text-right">
              <span className="text-xl font-medium  block pb-3">
                Payment Details
              </span>{' '}
              <p className="my-3">Payment Method: {order.paymentMethod}</p>
              <p className="my-3">
                Payment Status: {order.isPaid ? 'Completed' : 'Pending'}
              </p>
              {order.paymentMethod === 'PayPal' && order.isPaid && (
                <>
                  <p className="my-3">
                    Payment Date: {new Date(order.paidAt).toLocaleString()}
                  </p>
                  <p className="my-3">
                    Transaction Id: {order.paymentResult.id}
                  </p>
                </>
              )}
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

export default dynamic(() => Promise.resolve(OrderDetails), { ssr: false })
