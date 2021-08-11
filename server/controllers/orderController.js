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
    } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
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
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try{
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )

    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
    // return next()
  } catch(error){
      console.error(`Error: ${error.message}`.red.underline.bold)
      return next(`Error getting order: ${error.message}`)
  }
}

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res, next) => {
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
    return next(`Error updatting order to paid: ${error.message}`)
  }
}

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
  try{
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()

      const updatedOrder = await order.save()

      res.json(updatedOrder)
      return next()
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(`Error updating order to delivered: ${error.message}`)
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
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}