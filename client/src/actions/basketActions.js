import axios from 'axios'
import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM, BASKET_SAVE_SHIPPING_ADDRESS, BASKET_SAVE_PAYMENT_METHOD,} from '../constants/basketConstants'

export const addToBasket=(id,qty, chain, length, size, category)=>async(dispatch,getState)=>{
  const {data}=await axios.get(`api/products/${id}`)

  dispatch({
    type: BASKET_ADD_ITEM,
    payload: {
      product:data._id,
      name:data.name,
      image:data.image,
      price:chain==='silver'?data.price+35:chain==='cord'?data.price+10:data.price,
      countInStock:data.countInStock,
      chain,
      length,
      size,
      qty,
      category
    }
  })
  //Can only save strings to local storage.  Must be parsed upon retrieval in store
  localStorage.setItem('basketItems',JSON.stringify(getState().basket.basketItems))
}

export const removeFromBasket = (id, chain, length, size) => (dispatch, getState) => {
  // console.log(id, chain, length, size)
  dispatch({
    type: BASKET_REMOVE_ITEM,
    payload: {id, chain, length, size},
  })

  localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: BASKET_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: BASKET_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}