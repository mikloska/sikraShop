import Promo from '../models/promoModel.js'

const getPromo= async (req,res,next)=>{
  try{
    const promos= await Promo.find({})
    if(promos){
      res.json({promos})
    }else{
      res.status(400)
      throw new Error('Error saving promo code')
    }
    // res.json(`Promo code ${promoCode} has been is ${percentage}%`)
    // return next()
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in get promo controller: ${error.message}`))
  }

}

const getPromoById= async(req, res, next)=>{
  console.log('req.params is: ', req.params.id)
  try{
    const promo=await Promo.findOne({promoCode:req.params.id})
    if(promo){
      res.json(promo)
    }else{
      res.status(404)
      throw new Error('Invalid Code')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in post promo controller: ${error.message}`))
  }
}


const postPromo= async (req,res,next)=>{
  try{
    // console.log('in post promo controller. req.body is: ',req.body)
    const {promoCode, percentage} =req.body
    const promo=await Promo.create({promoCode, percentage})
    if(promo){
      res.json(`Promo code ${promoCode} has been set to ${percentage}%`)
    }else{
      res.status(400)
      throw new Error('Error saving promo code')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in post promo controller: ${error.message}`))
  }

}

const deletePromo= async (req,res,next)=>{
  try{
    console.log('in delete promo controller. req.params.id is: ',req.params.id)
    
    const promo=await Promo.findById(req.params.id)
    if(promo){
      await promo.remove()
      res.json({message: 'Promo deleted'})
    }else{
      res.status(400)
      throw new Error('Error deleting promo code')
    }
  }catch(error){
    console.error(`Error: ${error.message}`.red.underline.bold)
    return next(new Error(`Error in delete promo controller: ${error.message}`))
  }

}

export {getPromo, postPromo, deletePromo, getPromoById}