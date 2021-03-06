import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    //Get guest name and email address
    guest:{ type: String},
    email:{ type: String},
    user: {

      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User',
    },
    orderItems: [
      {

        name: { type: String, required: true },
        qty: { type: Number, required: true },
        length: {type: Number},
        size: {type:Number},
        braceletSize: {type:String},
        chain: {type: String},
        image: {type: [{type: String}], required:true},
        price: { type: Number, required: true },
        category: {type: String, required: true},
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String},
      province: { type: String},
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    promoUsed: {
      type: String,
      required: true,
      default: '',
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isShipped: {
      type: Boolean,
      required: true,
      default: false,
    },
    trackingNumber:{
      type:String
    },
    trackingLink:{
      type:String
    },
    shippedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order