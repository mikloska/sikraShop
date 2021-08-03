import express from 'express'
import products from '../data/products.js'
import {getProducts, getProductById} from '../controllers/productController.js'

const router=express.Router()

router.get('/', 
  getProducts,
  (req, res) => {
    // console.log('In get all products route. Res.locals is: ', res.locals)
    return res.status(200).json(res.locals.products)
  // try{
  //   const products=await Product.find({})
  //   if(products) return res.json(products)
  //   // throw new Error('Error getting products dude')
  //   return next()
  // } 
  // catch(error){
  //   console.error(`Error: ${error.message}`.red.underline.bold)
  //   return next(`Error getting products: ${error.message}`)
  // }
});


router.get('/:id',
  getProductById,
  (req, res) => {
    // console.log('In get product by id router. Res.locals is: ', res.locals)
    return res.status(200).json(res.locals.product)
  // try{
  //   const product=await Product.findById(req.params.id)
  //   if(product) return res.json(product)
  //   return next()
  // }catch(error){
  //   // return res.status(500).json(error.message);
  //   return next(new Error(`Product '${req.params.id}' not found`))
  //   // return next(error)
  //   // console.error(`Error: ${error.message}`.red.underline.bold)
  //   // process.exit(1)
  // }
  // try{
  //   const product=await Product.findById(req.params.id)
  //   if(product){
  //     return res.json(product)
  //   }else{
  //     res.status(404).json({message:'Product not found.'})
  //   }
  // }catch(error){
  //   // return res.status(500).json(error.message);
  //   console.error(`Error: ${error.message}`.red.underline.bold)
  //   // process.exit(1)
  // }
  
});

export default router