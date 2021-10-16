import {BASKET_ADD_ITEM, BASKET_REMOVE_ITEM, BASKET_SAVE_SHIPPING_ADDRESS, BASKET_SAVE_PAYMENT_METHOD, BASKET_CLEAR_ITEMS, BASKET_CLEAR_AFTER_ORDER,BASKET_RESET, BASKET_SAVE_GUEST_INFO, BASKET_CLEAR_GUEST_INFO,} from '../constants/basketConstants'
// BASKET_CLEAR_ADDRESS,BASKET_CLEAR_SHIPPING_PRICE, BASKET_CLEAR_ITEMS_PRICE, BASKET_CLEAR_TOTAL_PRICE, BASKET_CLEAR_TAX_PRICE} 
const initialState = { basketItems: [], shippingAddress: {} }
export const basketReducer = (
  state = { basketItems: [], shippingAddress: {}}, action
) => {
  switch (action.type) {
    case BASKET_ADD_ITEM:
      const item = action.payload
      
      // const exists = state.basketItems.find(x => x.product === item.product)
      const exists= state.basketItems.find((x,el) => 
        x.product === item.product && x.chain===item.chain && x.length===item.length &&  x.size===item.size)

      if (exists) {
        return {
          ...state,
          basketItems: state.basketItems.map((x) =>
            x.product === exists.product && x.chain===exists.chain && x.length===exists.length &&  x.size===exists.size? item : x
          ),
        }
      } else {
        return {
          ...state,
          basketItems: [...state.basketItems, item],
        }
      }
    case BASKET_REMOVE_ITEM:
      const newArr=[]
      for(let i =0; i< state.basketItems.length; i++){
        if(state.basketItems[i].product === action.payload.id && state.basketItems[i].chain===action.payload.chain && state.basketItems[i].length===action.payload.length &&  state.basketItems[i].size===action.payload.size){
          continue;
        }else newArr.push(state.basketItems[i])
      } 
      return {
        ...state,
        basketItems: newArr
      }
    case BASKET_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case BASKET_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    case BASKET_SAVE_GUEST_INFO:
      return {
        ...state,
        guestInfo: action.payload,
      }
    case BASKET_CLEAR_ITEMS:
      return {
        ...state,
        basketItems: [],
      }
    case BASKET_CLEAR_AFTER_ORDER:
      delete state.shippingAddress
      delete state.itemsPrice
      delete state.shippingPrice
      delete state.taxPrice
      delete state.totalPrice
    // case BASKET_CLEAR_ITEMS_PRICE:
    //   delete state.itemsPrice
    // case BASKET_CLEAR_SHIPPING_PRICE:
    //   delete state.shippingPrice
    // case BASKET_CLEAR_TAX_PRICE:
    //   delete state.taxPrice
    // case BASKET_CLEAR_TOTAL_PRICE:
    //   delete state.totalPrice
      
    case BASKET_CLEAR_GUEST_INFO:
      return {
        ...state,
        guestInfo: {name:' ',email:' '},
      }
    case BASKET_RESET:
      return {}
    default:
      return state
  }
}