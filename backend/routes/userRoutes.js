import { Router } from 'express'
import {
  deleteProfile,
  getAllUsers,
  login,
  readProfile,
  registerUser,
  updateProfile,
} from '../controllers/userController.js'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'

const router = Router()

router.post('/register', registerUser)

router.post('/login', login)

router.get('/profile', auth, readProfile)

router.patch('/profile', auth, updateProfile)

router.delete('/profile', auth, deleteProfile)

router.get('/getAll', auth, checkAdmin, getAllUsers)

export default router
