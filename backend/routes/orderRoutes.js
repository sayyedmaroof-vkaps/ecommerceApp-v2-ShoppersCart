import express from 'express'
import {
  getAllOrders,
  getMyOrders,
  getOneOrder,
  getOneOrderAdmin,
  placeOrder,
} from '../controllers/orderControllers.js'
import auth from '../middleware/auth.js'
import checkAdmin from '../middleware/checkAdmin.js'

const router = express.Router()

router.post('/new', auth, placeOrder)

router.get('/getAll', auth, checkAdmin, getAllOrders)

router.get('/myOrders', auth, getMyOrders)

router.get('/myOrders/:id', auth, getOneOrder)

router.get('/:id', auth, checkAdmin, getOneOrderAdmin)

export default router
