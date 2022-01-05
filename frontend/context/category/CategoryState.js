import React, { useState } from 'react'
import CategoryContext from './categoryContext'
import axios from 'axios'
import { useSnackbar } from 'notistack'

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

// ------------------------------------------
// Category State
// ------------------------------------------
const CategoryState = props => {
  const { enqueueSnackbar } = useSnackbar()

  const [categories, setCategories] = useState([])
  const [categoriesError, setCategoriesError] = useState(null)
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [categoriesMessage, setCategoriesMessage] = useState(null)

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
    setCategoriesLoading(false)
  }
  // Add new category
  const addCategory = async title => {
    const categoryBody = clean({ title })
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setCategoriesLoading(true)
      await axios.post('api/category/add', categoryBody, { headers })
      setCategories([...categories, categoryBody])
      setCategoriesMessage({
        variant: 'success',
        message: 'category added successfully!',
      })
      setCategoriesLoading(false)
      setCategoriesError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get all categories
  const getCategories = async () => {
    try {
      setCategoriesLoading(true)
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/getAll`
      )
      setCategories(data.categories)
      setCategoriesLoading(false)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get one category
  const getOneCategory = async id => {
    try {
      const { data } = await axios.get(`/api/category/${id}`)
      return data.categories
    } catch (err) {
      errorHandler(err)
    }
  }

  const updateCategory = async (id, title) => {
    try {
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      setCategoriesLoading(true)
      await axios.patch(`api/category/${id}`, { title }, { headers })
      getCategories()
      setCategoriesMessage({
        variant: 'info',
        message: 'Category updated!',
      })
      setCategoriesLoading(false)
      setCategoriesError(null)
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        // categoriesError,
        // categoriesMessage,
        categoriesLoading,
        getCategories,
        addCategory,
        getOneCategory,
        updateCategory,
      }}>
      {props.children}
    </CategoryContext.Provider>
  )
}

export default CategoryState
