import axios from 'axios'
import { BASKET_ADD_ITEM} from '../constants/basketConstants'

export const addToBasket=(id,qty)=>(dispatch,getState)=>{
  const {data}=await.get(`api/products/${id}`)

  dispatch({
    type: BASKET_ADD_ITEM,
    payload: {
      product:data._id,
      name:data.name,
      image:data.image,
      price:data.price,
      countInStock:data.countInStock,
      qty,
    }
  })
  //Can only save strings to local storage.  Must be parsed upon retrieval in store
  localStorage.setItme('basketItems',JSON.stringify(getState().basket.basketItems))
}