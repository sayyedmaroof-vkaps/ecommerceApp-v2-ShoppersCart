import Category from '../models/Category.js'

// @desc Add new category
// @route POST '/api/category/add'
// @access Private : Admin
export const addCategory = async (req, res) => {
  try {
    const category = new Category(req.body)
    await category.save()
    res.status(201).json({ success: true, message: 'Category Added', category })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get all category
// @route GET '/api/category/getAll'
// @access Public
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json({ success: true, categories })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get One category
// @route GET '/api/category/:id'
// @access Public
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: 'Category not found' })
    }
    res.json({ success: true, category })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update Category
// @route PATCH '/api/category/:id'
// @access Private : Admin
export const updateCategory = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'image']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ success: false, error: 'Invalid updates' })
  }

  const category = await Category.findById(req.params.id)
  if (!category) {
    return res.status(404).json({ success: false, error: 'Category not found' })
  }

  updates.forEach(update => (category[update] = req.body[update]))
  try {
    await category.save()
    res.json({ success: true, message: 'Category Updated!', category })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Delete a category
// @route DELETE  '/api/category/:id'
// @access Private : Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: 'Category not found' })
    }

    await category.remove()
    res.json({ success: true, message: 'Category deleted' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
