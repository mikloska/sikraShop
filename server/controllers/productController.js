import Product from '../models/productModel.js'

// Desc: Fetch all products
// Route: Get api/products
// Access: public

const getProducts = async(req,res, next) => {
  try{
    res.locals.products=await Product.find({})
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

// Desc: Fetch single product
// Route: Get api/products/:id
// Access: public

const getProductById = async(req,res, next) => {
  // console.log('In get product by id controller. Req.params is: ', req.params)
  try{
    res.locals.product=await Product.findById(req.params.id)
    // console.log('In get product by id controller. Res.locals is: ', res.locals)
    // if(product) return res.json(product)
    return next()
  }catch(error){
    // return res.status(500).json(error.message);
    return next(new Error(`Product '${req.params.id}' not found`))
    // return next(error)
    // console.error(`Error: ${error.message}`.red.underline.bold)
    // process.exit(1)
  }
}


// Desc: Delete single product
// Route: DELETE api/products/:id
// Access: private/admin

const deleteProduct = async(req,res, next) => {
  // console.log('In get product by id controller. Req.params is: ', req.params)
  try{
    const product=await Product.findById(req.params.id)
    if(product){
      await product.remove()
      res.json({message: 'Product deleted'})
    }else{
      res.status(404)
      throw new Error('Product not found')
    }
    // console.log('In get product by id controller. Res.locals is: ', res.locals)
    // if(product) return res.json(product)
    // return next()
  }catch(error){
    // return res.status(500).json(error.message);
    return next(new Error(`Product '${req.params.id}' not found`))
    // return next(error)
    // console.error(`Error: ${error.message}`.red.underline.bold)
    // process.exit(1)
  }
}

// Desc: Create single product
// Route: POST api/products/:id
// Access: private/admin

const createProduct = async(req,res, next) => {
  // console.log('In get product by id controller. Req.params is: ', req.params)
  try{
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      // category: 'Sample category',
      // brand: "brand",
      countInStock: 5,
      numReviews: 0,
      // description: '',
  })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  }catch(error){
    // return res.status(500).json(error.message);
    return next(new Error(`Product '${req.params.id}' not found`))
    // return next(error)
    // console.error(`Error: ${error.message}`.red.underline.bold)
    // process.exit(1)
  }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  try{
    const {name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  }catch(error){
    // return res.status(500).json(error.message);
    return next(new Error(`Product '${req.params.id}' not found`))
    // return next(error)
    // console.error(`Error: ${error.message}`.red.underline.bold)
    // process.exit(1)
  }
}




export {getProducts,getProductById, deleteProduct, createProduct, updateProduct}