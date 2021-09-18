import express from 'express'
const router = express.Router()
import {signUpEmail, orderEmail, orderNotificationEmail} from '../controllers/emailController.js'


router.route('/signup').post(signUpEmail)
router.route('/order').post(orderEmail)
router.route('/ordernotification').post(orderNotificationEmail)
//send forgot pw

export default router