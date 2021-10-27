import express from 'express'
import {getPromo, postPromo, deletePromo} from '../controllers/promoController.js'
const router=express.Router()

router.route('/').get(getPromo).post(postPromo)
router.route('/:id').delete(deletePromo)

export default router