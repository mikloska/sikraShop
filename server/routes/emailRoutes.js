import express from 'express'
const router = express.Router()
import {signUpEmail, orderEmail, orderNotificationEmail, shippingNotificationEmail} from '../controllers/emailController.js'


router.route('/signup').post(signUpEmail)
router.route('/order').post(orderEmail)
router.route('/ordernotification').post(orderNotificationEmail)
router.route('/shippingnotification').post(shippingNotificationEmail)
//send forgot pw

export default router