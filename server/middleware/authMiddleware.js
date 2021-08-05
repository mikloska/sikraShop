import { DeckRounded } from '@material-ui/icons'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protectUser = async (req,res,next) => {
  try {
    let token
    //Convention to check if bearer token exits
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){   
      try{
        //This splits the Bearer word from the token by the space.  Bearer word is index 0, token is index 1
        token=req.headers.authorization.split(' ')[1]
        //Decode token to get id from it
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //Don't unnecessarily send user pw
        req.user=await User.findById(decoded.id).select('-password')
        // console.log('Decoded: ',decoded)
        return next()
      }catch(error){
        res.status(401)
        return next(new Error(`Not authorized, token failed: ${error.message}`))
      }
    }else{
      throw new Error('Not authorized: no token found')
    }

  }catch(error) {
    return next(new Error(`Error in protect user middleware: ${error.message}`))
  }

}

export {protectUser}