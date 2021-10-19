import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
// Desc: Authorize user and provide token
// Route: POST api/users/login
// Access: public

const authenticateUser = async(req,res, next) => {
  try{
    // console.log(req.body)
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await user.matchPW(password))){
      res.locals.userInfo=({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id),
      })
      
      }
    else{
      res.status(401)
      return next(new Error('Invalid email or password'))
    }
    return next()
  } 
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in authUser controller: ${error.message}`))
  }
}

// Desc: Register a new user
// Route: POST api/users
// Access: public

const registerUser = async(req,res, next) => {
  try{
    console.log('In registerUser controller. Re.body is: ',req.body)
    const{name, email, password, mailingList, shippingAddress}=req.body
    const exists=await User.findOne({email})
    if(exists){
      throw new Error('User already exists')
    }
    const user=await User.create({name,email,password, mailingList, shippingAddress})
    if(user){
      res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id),
      })
      return
    }else {
      res.status(400)
      throw new Error('User data is invalid')
    }
    return next()
  } 
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in register user controller: ${error.message}`))
  }
}

// Desc: Authorize user and provide token
// Route: Get api/users/profile
// Access: private

const getProfile = async(req,res, next) => {
  // res.send('It worked!')
  try{
    const user= await User.findById(req.user._id)
    if(user){
    //  res.locals.userProfile=({
     res.json({
       _id:user._id,
       name:user.name,
       email:user.email,
       shippingAddress:user.shippingAddress,
       mailingList:user.mailingList,
       isAdmin:user.isAdmin,
     })
    }else{
      res.status(404)
      throw new Error('User not found')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in getProfile controller: ${error.message}`))
  }

}

// Desc: Update user profile
// Route: PUT api/users/profile
// Access: private

const updateProfile = async(req,res, next) => {
  console.log('In updateProfile: ',req.body)
  // res.send('It worked!')
  try{
    const user= await User.findById(req.user._id)
    if(user){
    //Change name or email
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.shippingAddress = req.body.shippingAddress || user.shippingAddress
    user.mailingList = req.body.mailingList || user.mailingList
    if (req.body.password) {
      //Will automatically be encrypted due to presave middleware
      user.password = req.body.password
    }  
    const updated = await user.save()
    res.status(201).json({
      _id:updated._id,
      name:updated.name,
      email:updated.email,
      shippingAddress:updated.shippingAddress,
      mailingList:updated.mailingList,
      isAdmin:updated.isAdmin,
      token:generateToken(updated._id),
    })

    }else{
      res.status(404)
      throw new Error('User not found')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in getProfile controller: ${error.message}`))
  }

}

// Desc: Get all users
// Route: GET api/users
// Access: private- Admin only
const getUsers = async(req,res, next) => {
  // res.send('It worked!')
  try{
    const users= await User.find({})
    if(users){
      res.json(users)

    }else{
      res.status(404)
      throw new Error('Users not found')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in get all users controller: ${error.message}`))
  }

}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try{
  const user = await User.findById(req.params.id)

    if (user) {
      await user.remove()
      res.json({ message: `User ${req.params.id} removed` })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in delete user controller: ${error.message}`))
  }
}

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in get user by id controller: ${error.message}`))
  }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      // user.isAdmin = req.body.isAdmin

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      }) 
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in update user controller: ${error.message}`))
  }
}

// @desc    Reset user pw
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = async (req, res, next) => {
  // console.log('req.body: ',req.body)
  try{
    const buffer = crypto.randomBytes(32)
    const token = buffer.toString("hex")
    res.locals.token=token
    console.log('token: ',token)
    const user = await User.findOne({email:req.body.email})

    if(!user) return res.status(422).json({error:"No user with that email"})
    user.resetToken = token
    
    user.expiryResetToken = Date.now() + 3600000
    await user.save()
    // res.json('sent')
    return next()
  
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in reset password user controller: ${error.message}`))
  }
}


// @desc    Reset user pw
// @route   POST /api/users/passwordreset
// @access  Public
const resetPassword = async (req, res, next)=>{
  // console.log('req.body: ',req.body)
  try{
    const user = await User.findOne({resetToken:req.body.token,expiryResetToken:{$gt:Date.now()}})
     if(!user) return res.status(422).json({error:"Try again session expired"})
    user.password = req.body.password
    user.resetToken = undefined
    user.expiryResetToken = undefined
    await user.save()
    res.locals.message='password updated successfully'
    return next()
    

  // User.findOne({resetToken:req.body.token,expiryResetToken:{$gt:Date.now()}})
  // .then(user=>{
  //     if(!user){
  //         return res.status(422).json({error:"Try again session expired"})
  //     }
      
  //     // this.password=await bcrypt.hash(this.password, salt)

  //        user.password = req.body.password
  //        user.resetToken = undefined
  //        user.expiryResetToken = undefined
  //        user.save().then((saveduser)=>{
  //            res.json({message:"password updated successfully"})
  //        })

  // }).catch(err=>{
  //     console.log(err)
  // })
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in reset password user controller: ${error.message}`))
  }
}

export {authenticateUser, getProfile, registerUser, updateProfile, getUsers, deleteUser, updateUser, getUserById, forgotPassword, resetPassword}