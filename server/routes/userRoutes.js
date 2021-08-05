import express from 'express'
import {authenticateUser, getProfile, registerUser} from '../controllers/userController.js'
import {protectUser} from '../middleware/authMiddleware.js'

const router=express.Router()

router.post('/', registerUser)
router.post('/login', 
  authenticateUser,
  (req, res) => {
    // console.log(res.locals.userInfo)
    return res.status(200).json(res.locals.userInfo)

});
//router.route bc we have separate get and post request to same end point
router.route('/profile').get(protectUser, getProfile)
// router.get('/profile',
//   protectUser, getProfile,
  // (req, res) => {
  //   console.log('In get user profile router: ', res.locals.userProfile)
  //   return res.status(200).json(res.locals.userProfile)
  
  // }
  // );

export default router