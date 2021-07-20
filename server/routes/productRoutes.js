import express from 'express'
import products from '../data/products.js'
const router=express.Router()
import Product from '../models/productModel.js'

// Desc: Fetch all products
// Route: Get api/products
// Access: public

router.get('/', async (req, res) => {
  try{
    const products=await Product.find({})
    return res.json(products)  
  } catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next()
  }
  res.json(products);
});

// Desc: Fetch single product
// Route: Get api/products/:id
// Access: public
router.get('/:id', async (req, res) => {
  try{
    const product=await Product.findById(req.params.id)
    if(product){
      return res.json(product)
    }else{
      res.status(404).json({message:'Product not found.'})
    }
  }catch(error){
    return res.status(500).json(error.message);
    // console.error(`Error: ${error.message}`.red.underline.bold)
    // process.exit(1)
  }
  
});

export default router