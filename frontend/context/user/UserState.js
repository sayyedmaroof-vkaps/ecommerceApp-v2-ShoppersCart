import UserContext from './UserContext'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import { useRouter } from 'next/router'

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
  //fort navigate
  const router = useRouter()
  // const navigate = useNavigate()

  // axios config
  // const userToken = JSON.parse(localStorage.getItem('userToken'))
  // const headers = {
  //   Authorization: `Bearer ${userToken || ''}`,
  // }

  const [user, setUser] = useState(null)
  const [userError, setUserError] = useState(null)
  const [userLoading, setUserLoading] = useState(false)
  const [userMessage, setUserMessage] = useState(null)
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUser(userInfo)
  }, [])

  //   for disabling the alert messages after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setUserMessage(null)
      setUserError(null)
    }, 3000)
  }, [userMessage, userError])

  // Error handler funtion
  const errorHandler = (err, info) => {
    if (info === undefined || null) {
      info = ''
    }
    if (err.response) {
      setUserError({
        variant: 'danger',
        message: `${info} ${err.response.data.error}`,
      })
    } else if (err.request) {
      setUserError({
        variant: 'danger',
        message: `${info} No response from server`,
      })
    } else {
      setUserError({ variant: 'danger', message: err.message })
    }
    // setUserLoading(false)
  }

  // -----------------------------------------------------------------
  // Login user
  // -----------------------------------------------------------------
  const login = async (email, password) => {
    try {
      // setUserLoading(true)

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
        {
          email,
          password,
        }
      )
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      return true
      // alert('Logged in successfully')
      // router.push('/') redirection from different pages will be awesome
      // setUserError(null)
      // setUserLoading(false)
      // setUserMessage({ variant: 'success', message: 'Logged In successfully' })
      //   history.push('/')
    } catch (err) {
      alert(err.response ? err.response.data.error : err.message)
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
      setUserLoading(true)
      const { data } = await axios.post(`api/users/register`, body)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('userToken', JSON.stringify(data.token))
      setUser(data.user)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'success', message: 'Signed up successfully' })
      navigate('/')
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
      // await axios.post(`api/users/logout`, null, {
      //   headers,
      // })
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      localStorage.removeItem('react-use-cart')
      setUser(null)
      setUserError(null)
      setUserLoading(false)
      setUserMessage({ variant: 'dark', message: 'You have logged out!' })
      navigate('/login')
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
  const editProfile = async (name, email) => {
    try {
      setUserLoading(true)
      const body = clean({ name, email })
      const { data } = await axios.patch('api/users/profile', body, { headers })
      setUser(data.user)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      setUserError(null)
      setUserLoading(false)
      setUserMessage({
        variant: 'success',
        message: 'Your profile was updated successfully',
      })
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
      const { data } = await axios.get('/api/users/getAll', { headers })
      setAllUsers(data.users)
      setUserError(null)
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
        userError,
        userLoading,
        userMessage,
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
