import UserContext from './UserContext'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useCart } from 'react-use-cart'

// Function for cleaning null, undefined and empty strings values in objects
function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

const UserState = props => {
  const { enqueueSnackbar } = useSnackbar()
  const { emptyCart } = useCart()
  const router = useRouter()

  // axios config
  const userToken =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('userToken'))
  const headers = {
    Authorization: `Bearer ${userToken || ''}`,
  }

  const [user, setUser] = useState(
    typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('userInfo'))
  )
  const [userLoading, setUserLoading] = useState(false)
  const [allUsers, setAllUsers] = useState([])

  // Error handler funtion
  const errorHandler = (err, info) => {
    if (info === undefined || null) {
      info = ''
    }
    if (err.response) {
      enqueueSnackbar(`${info} ${err.response.data.error}`, {
        variant: 'error',
      })
    } else if (err.request) {
      enqueueSnackbar(`${info} No response from server`, {
        variant: 'error',
      })
    } else {
      enqueueSnackbar(err.message, { variant: 'error' })
    }
    setUserLoading(false)
  }

  // -----------------------------------------------------------------
  // Login user
  // -----------------------------------------------------------------
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`/api/users/login`, {
        email,
        password,
      })
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      enqueueSnackbar('Logged in successfully', { variant: 'success' })
      return true
    } catch (err) {
      errorHandler(err)
      return false
    }
  }

  // -----------------------------------------------------------------
  // Signup a new user
  // -----------------------------------------------------------------
  const signup = async (name, email, password) => {
    try {
      const body = clean({ name, email, password })
      const { data } = await axios.post(`/api/users/register`, body)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      enqueueSnackbar('user registered successfully!', { variant: 'success' })
      return true
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Logout a user
  // -----------------------------------------------------------------
  const logout = async () => {
    try {
      setUserLoading(true)
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      localStorage.removeItem('react-use-cart')
      localStorage.removeItem('shoppersCart-shippingAddress')
      localStorage.removeItem('shoppersCart-paymentMethod')
      emptyCart()
      setUser(null)
      setUserLoading(false)
      enqueueSnackbar('User logged out')
      router.push('/')
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Read user profile
  // -----------------------------------------------------------------
  const readProfile = async () => {
    try {
      setUserLoading(true)
      const { data } = await axios.get('api/users/profile', { headers })
      setUserError(null)
      setUserLoading(false)
      return data
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Edit Profile
  // -----------------------------------------------------------------
  const editProfile = async (name, email, password) => {
    try {
      setUserLoading(true)
      const body = clean({ name, email, password })
      const { data } = await axios.patch(`/api/users/profile`, body, {
        headers,
      })
      setUser(data.user)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      setUserLoading(false)
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
      return data
    } catch (err) {
      errorHandler(err, 'Could not update your profile!')
    }
  }

  // -----------------------------------------------------------------
  // Get all users
  // -----------------------------------------------------------------
  const getAllUsers = async () => {
    try {
      setUserLoading(true)
      const { data } = await axios.get(`/api/users/getAll`, { headers })
      setAllUsers(data.users)
      setUserLoading(false)
    } catch (err) {
      errorHandler(err)
    }
  }

  // -----------------------------------------------------------------
  // Delete Profile
  // -----------------------------------------------------------------
  // const deleteProfile = async () => {
  //   try {
  //     setUserLoading(false)
  //     await axios.delete('api/users/me', { headers })
  //     localStorage.removeItem('userInfo')
  //     setUser(null)
  //     setUserError(null)
  //     setUserLoading(false)
  //     setUserMessage({ variant: 'danger', message: 'Profile deleted' })
  //     navigate('/login')
  //   } catch (err) {
  //     errorHandler(err)
  //   }
  // }

  return (
    <UserContext.Provider
      value={{
        user,
        userLoading,
        allUsers,
        login,
        signup,
        logout,
        readProfile,
        editProfile,
        getAllUsers,
        // deleteProfile
      }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
