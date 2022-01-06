import React, { useContext } from 'react'
import NextLink from 'next/link'
import UserContext from '../context/user/UserContext'

const Nav = props => {
  // for user context
  const uContext = useContext(UserContext)
  const { user } = uContext
  return (
    <div className="px-4 py-2  bg-red-400 w-1/4">
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="inline w-8 h-8 text-white lg:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg> */}
      <div className=" lg:block">
        <div className="my-2 mb-6">
          <h1 className="text-2xl font-bold text-white">
            Admin : <br /> <span className="text-purple-800"> {user.name}</span>
          </h1>
        </div>
        <ul>
          <li
            className={`mb-2 ${
              props.activeScreen === 'orders'
                ? 'bg-gray-800'
                : 'hover:bg-gray-600'
            }   rounded shadow`}>
            <NextLink href="/admin/orders">
              <a className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                Orders
              </a>
            </NextLink>
          </li>
          <li
            className={`mb-2 ${
              props.activeScreen === 'products'
                ? 'bg-gray-800'
                : 'hover:bg-gray-600'
            }   rounded shadow`}>
            <NextLink href="/admin">
              <a className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                Products
              </a>
            </NextLink>
          </li>
          <li
            className={`mb-2 ${
              props.activeScreen === 'users'
                ? 'bg-gray-800'
                : 'hover:bg-gray-600'
            }   rounded shadow`}>
            <NextLink href="/admin/users">
              <a className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                Users
              </a>
            </NextLink>
          </li>
          <li
            className={`mb-2 ${
              props.activeScreen === 'addProduct'
                ? 'bg-gray-800'
                : 'hover:bg-gray-600'
            }   rounded shadow`}>
            <NextLink href="/admin/addProduct">
              <a className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Product
              </a>
            </NextLink>
          </li>

          <li
            className={`mb-2 ${
              props.activeScreen === 'addCategory'
                ? 'bg-gray-800'
                : 'hover:bg-gray-600'
            }   rounded shadow`}>
            <NextLink href="/admin/addCategory">
              <a className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-6 h-6 mr-2 -mt-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Category
              </a>
            </NextLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

Nav.defaultProps = {
  activeScreen: 'orders',
}

export default Nav
