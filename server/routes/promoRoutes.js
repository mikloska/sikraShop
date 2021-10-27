import express from 'express'
import {getPromo, postPromo, deletePromo, getPromoById} from '../controllers/promoController.js'
const router=express.Router()

router.route('/').get(getPromo).post(postPromo)
router.route('/:id').delete(deletePromo).get(getPromoById)

export default router