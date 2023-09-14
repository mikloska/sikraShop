import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protectUser = async (req, res, next) => {
  console.log('in protectUser controller')
  try{
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      // console.log('token: ',req.headers)
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded)
      //Add everything but password
      req.user = await User.findById(decoded.id).select('-password')
      // console.log(req.user)
      return next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error in protectUser controller: ${error.message}`)
  }
}

const admin = (req, res, next) => {
  try{
    if (req.user && req.user.isAdmin) {
      return next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
  }
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error in admin controller: ${error.message}`)
  }
}

export { protectUser, admin }