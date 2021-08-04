import User from '../models/userModel.js'

// Desc: Authorize user and provide token
// Route: Get api/users/login
// Access: public

const authUser = async(req,res, next) => {
  try{
    console.log(req.body)
    const{email,password}=req.body
    res.locals.userInfo=({email,password})
    // res.locals.products=await Product.find({})
    // console.log('In get all products controller. Res.locals is: ', res.locals)
    // if(products) return res.json(products)
    // throw new Error('Error getting products dude')
    return next()
  } 
  catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error getting products: ${error.message}`)
  }
}

export {authUser}