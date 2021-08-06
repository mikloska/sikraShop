import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

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
    // console.log(req.body)
    const{name, email, password}=req.body
    const exists=await User.findOne({email})
    if(exists){
      throw new Error('User already exists')
    }
    const user=await User.create({name,email,password})
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
  // res.send('It worked!')
  try{
    const user= await User.findById(req.user._id)
    if(user){
    //Change name or email
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      //Will automatically be encrypted due to presave middleware
      user.password = req.body.password
    }  
    const updated = await user.save()
    res.status(201).json({
      _id:updated._id,
      name:updated.name,
      email:updated.email,
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

export {authenticateUser, getProfile, registerUser, updateProfile}