import express from 'express'
const router = express.Router()
import {signUpEmail, orderEmail} from '../controllers/emailController.js'


router.route('/signup').post(signUpEmail)
router.route('/order').post(orderEmail)
//send forgot pw

export default router