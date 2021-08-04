import express from 'express'
import {authUser} from '../controllers/userController.js'

const router=express.Router()

router.post('/login', 
  authUser,
  (req, res) => {
    return res.status(200).send(res.locals.userInfo)

});

export default router