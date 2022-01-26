import express from 'express'
import {authenticateUser, getProfile, registerUser, updateProfile, getUsers, deleteUser, updateUser, getUserById, forgotPassword, resetPassword} from '../controllers/userController.js'
import {emailResetLink} from '../controllers/emailController.js'
import {protectUser, admin} from '../middleware/authMiddleware.js'

const router=express.Router()

//Post to add new user and the get to get all users if admin
router.route('/').post(registerUser).get(protectUser, admin, getUsers)
router.post('/login', 
  authenticateUser,
  (req, res) => {
    // console.log(res.locals.userInfo)
    return res.status(200).json(res.locals.userInfo)

});
//router.route bc we have separate get and post request to same end point
router.route('/profile').get(protectUser, getProfile).put(protectUser,updateProfile)
router
  .route('/:id')
  .delete(protectUser, admin, deleteUser)
  .get(protectUser, admin, getUserById)
  .put(protectUser, admin, updateUser)

// router.get('/profile',
//   protectUser, getProfile,
  // (req, res) => {
  //   console.log('In get user profile router: ', res.locals.userProfile)
  //   return res.status(200).json(res.locals.userProfile)
  
  // }
  // );
  // router.route('/forgotpassword').post(forgotPassword, emailResetLink)
  // (req,res)=>{
    // console.log('res.locals in forgotPassword route: ', res.locals)
    // console.log(res.locals.token)
    // return res.status(200).json(res.locals.token)
  // })

  // router.post('/passwordreset',resetPassword,
  // (req,res)=>{
  //   return res.status(200).json(res.locals.user)
  // })
  router.post('/forgotpassword',forgotPassword, emailResetLink,
  (req,res)=>{
    // console.log('res', res)
    // console.log('res.locals in forgotPassword route: ', res.locals)
    // console.log(res.locals.token)
    return res.status(200).json(res.locals.token)
  })

  router.post('/passwordreset',resetPassword,
  (req,res)=>{
    return res.status(200).json(res.locals.user)
  })

export default router