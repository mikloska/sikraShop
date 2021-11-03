import Product from '../models/productModel.js'

// Desc: Fetch products by category
// Route: Get api/products/category/:id
// Access: public

const getProductsByCategory = async(req,res, next) => {
  // console.log('In get product by id controller. Req.params is: ', req.params)
  try{
    const catPageSize = 9
    const catPage = Number(req.query.pageNumber) || 1
    const catCount = await Product.countDocuments({"category":req.params.id})
    //Skip over the exact amount per page that is before
    const productsCategory = await Product.find({"category":req.params.id}).limit(catPageSize).skip(catPageSize * (catPage - 1))

    res.json({ productsCategory, catPage, catPages: Math.ceil(catCount / catPageSize) })
    // res.locals.productsByCategory=await Product.find({"category":req.params.id})
    // console.log('In get product by id controller. Res.locals is: ', res.locals)
    // if(product) return res.json(product)
    // return next()
  }catch(error){
    // return res.status(500).json(error.message);
    return next(new Error(`Products in category '${req.params.id}' not found`))
    // return next(error)
    // console.error(`Error: ${error.message}`.red.underline.bold)
    // process.exit(1)
  }
}

// Desc: Fetch all products
// Route: Get api/products
// Access: public

const getProducts = async(req,res, next) => {
  try{
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword

    ? {
        name: {
          //Regex to get even if not full name is typed in
          $regex: req.query.keyword,
          //Case insensitive
          $options: 'i',
        },
      }
    : {}
    const count = await Product.countDocuments({ ...keyword })
    //Skip over the exact amount per page that is before
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
    // console.log('In get all products controller. Res.locals is: ', res.locals)
    // if(products) return res.json(products)
    // throw new Error('Error getting products dude')
    // next()
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
      name: 'New',
      price: 0,
      user: req.user._id,
      // image: '',
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
    // console.log('in updateProduct controller. Req.body is: ',req.body)
    const {name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name
      product.price = price
      product.description = description
      if(image) product.image.push(image)
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

// @desc    Update a product's images
// @route   PUT /api/products/images/:id
// @access  Private/Admin
const updateProductImageOrder = async (req, res, next) => {
  try{
    const {imageArr} = req.body
    console.log(req.body)
    const product = await Product.findById(req.params.id)

    if (product) {
      product.image=imageArr

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  }catch(error){
    return next(new Error(`Product '${req.params.id}' not found`))
  }
}


// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private

const createProductReview = async (req, res, next) => {
  try{
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)
  
    if (product) {
      //Make sure that item hasn't already been reviewed by user
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
      // console.log(alreadyReviewed)
  
      if (alreadyReviewed) {
        res.status(400)
        return next(new Error('Product already reviewed'))
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
      //Add up and divide reviews to get average
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
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


const deleteProductImage = async (req, res, next) => {
  try{
    const {pic} = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      // console.log(product.image, 'product: ',req.body)
      product.image=product.image.filter(img=>img!==pic)


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




export {getProducts,getProductById, deleteProduct, createProduct, updateProduct, getProductsByCategory, createProductReview, deleteProductImage, updateProductImageOrder}