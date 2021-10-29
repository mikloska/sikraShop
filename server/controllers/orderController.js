import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
  try{
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
      promoUsed
    } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid : true,
        paidAt: Date.now(),
        paymentResult,
        promoUsed

    })

      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
      // return next()
    }
  } catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error adding order items: ${error.message}`)
  }
}

const addGuestOrderItems = async (req, res, next) => {
  try{
    const {
      guest,email,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
      promoUsed
    } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      
    } else {
      const order = new Order({
        guest:guest,
        email:email,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid : true,
        paidAt: Date.now(),
        paymentResult,
        promoUsed


    })

      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
      // return next()
    }
  } catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error adding order items: ${error.message}`)
  }
}

// @desc    Get order by ID
// @route   GET /api/guest/orders/:id
// @access  Public
const getGuestOrderById = async (req, res, next) => {
  // console.log('req.user: ',req.user.email)
  // console.log('in getOrderById controller')
  try{
    //Almost like a foreign key, this goes into the connected user table and grabs the name and email address of buyer. Name and emaila are 2 separate fields.
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    // console.log('order: ',order)


    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
    // next()
  } catch(error){
      console.error(`Error: ${error.message}`.red.underline.bold)
      return next(`Error getting order: ${error.message}`)
  }
}
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  // console.log('req.user: ',req.user.email)
  // console.log('in getOrderById controller')
  try{
    //Almost like a foreign key, this goes into the connected user table and grabs the name and email address of buyer. Name and emaila are 2 separate fields.
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
    // console.log('order: ',order)
    if(req.user.email!==order.user.email){
      res.status(404)
      throw new Error('Not authorized')
    } 

    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
    // next()
  } catch(error){
      console.error(`Error: ${error.message}`.red.underline.bold)
      return next(`Error getting order: ${error.message}`)
  }
}

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res, next) => {
  console.log('In updateOrderToPaid controller')
  try{
    const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = { id: req.body.id, status: req.body.status, update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
      res.status(404)
      throw new Error('Order not found')
  }
    // return next()
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error updateing order to paid: ${error.message}`)
  }
}

// @desc    Update order to shiped
// @route   GET /api/orders/:id/ship
// @access  Private/Admin
const updateOrderToShipped = async (req, res, next) => {
  try{
    const order = await Order.findById(req.params.id)
    console.log('req.params: ', req.params)
    // const {trackingNumber, trackingLink} = req.body
    console.log('req.body: ',req.body)

    if (order) {
      order.trackingNumber=req.body.trackingNumber
      order.trackingLink=req.body.trackingLink
      order.isShipped = true
      order.shippedAt = Date.now()

      const updatedOrder = await order.save()

      res.json(updatedOrder)
      // return next()
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error updating order to shipped: ${error.message}`)
  }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try{
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
    // return next()
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error getting my orders: ${error.message}`)
  }
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res, next) => {
  try{
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
    // return next()
  } catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error getting orders: ${error.message}`)
  }
}

export {
  addOrderItems,
  addGuestOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToShipped,
  getMyOrders,
  getOrders,
  getGuestOrderById
}