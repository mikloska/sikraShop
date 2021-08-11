import express from 'express'
const router = express.Router()
import {addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders,
} from '../controllers/orderController.js'
import { protectUser, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protectUser, addOrderItems).get(protectUser, admin, getOrders)
router.route('/myorders').get(protectUser, getMyOrders)
router.route('/:id').get(protectUser, getOrderById)
router.route('/:id/pay').put(protectUser, updateOrderToPaid)
router.route('/:id/deliver').put(protectUser, admin, updateOrderToDelivered)

export default router