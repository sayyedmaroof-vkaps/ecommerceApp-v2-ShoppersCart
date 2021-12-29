import express from 'express'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController.js'

const router = express.Router()

router.post('/add', auth, checkAdmin, addCategory)

router.get('/getAll', getAllCategories)

router.get('/:id', getCategory)

router.patch('/:id', auth, checkAdmin, updateCategory)

router.delete('/:id', auth, checkAdmin, deleteCategory)

export default router
