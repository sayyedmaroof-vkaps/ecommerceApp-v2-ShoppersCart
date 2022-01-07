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
  const [categoriesLoading, setCategoriesLoading] = useState(false)

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
      setCategoriesLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      await axios.post('/api/category/add', categoryBody, { headers })
      setCategories([...categories, categoryBody])
      enqueueSnackbar(`Category Added: ${categoryBody.title}`, {
        variant: 'success',
      })
      setCategoriesLoading(false)
    } catch (err) {
      errorHandler(err)
    }
  }

  // get all categories
  const getCategories = async () => {
    try {
      setCategoriesLoading(true)
      const { data } = await axios.get(`/api/category/getAll`)
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
      setCategoriesLoading(true)
      const userToken = JSON.parse(localStorage.getItem('userToken'))
      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      }
      await axios.patch(`api/category/${id}`, { title }, { headers })
      enqueueSnackbar(`Category Updaated successfully with title ${title}`, {
        variant: 'success',
      })
      setCategoriesLoading(false)
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
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
