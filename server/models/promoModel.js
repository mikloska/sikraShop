import mongoose from 'mongoose'

const promoSchema= mongoose.Schema({
  promoCode: { type: String, required: true, unique:true },
  percentage: { type: Number, required: true },
})

const Promo= mongoose.model('Promo', promoSchema)
export default Promo;