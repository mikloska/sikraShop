import mongoose from 'mongoose'

const reviewSchem=mongoose.Schema({
  name:{type:String, required:true},
  rating:{type:Number, required:true},
  comment:{type:String, required:true}
},{
  timestamps:true
})

const productSchema= mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
      },
    brand: {
      required: true,
      default: false
      },
    category: {
      type: String,
      required: true
      },
    description: {
      type: String,
      required: true
      },
    reviews: [],
    rating: {
      type: Number,
      required: true,
      default: 0
      },
    numReviews: {
      type: Number,
      required: true,
      default: 0
      },
    price: {
      type: Number,
      required: true,
      default: 0
      },
    countInStock: {
      type: Number,
      required: true,
      default: 0
      },
}, {
  //automatically create a 'Created At' and 'Updated At'
  timestamps: true
})

const Prodcut= mongoose.model('Product', productSchema)
export default Product