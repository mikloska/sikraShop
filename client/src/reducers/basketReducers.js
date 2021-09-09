import {BASKET_ADD_ITEM, BASKET_REMOVE_ITEM, BASKET_SAVE_SHIPPING_ADDRESS, BASKET_SAVE_PAYMENT_METHOD, BASKET_CLEAR_ITEMS,} from '../constants/basketConstants'

export const basketReducer = (
  state = { basketItems: [], shippingAddress: {} },
  action
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
            x.product === exists.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          basketItems: [...state.basketItems, item],
        }
      }
    case BASKET_REMOVE_ITEM:
      console.log(action.payload.id)
      return {
        ...state,
        basketItems: state.basketItems.filter((x) => 
          x.product !== action.payload.id && x.chain!==action.payload.chain && x.length!==action.payload.length &&  x.size!==action.payload.size),

      }

      // if(exists){

      // }else{
      //   return {
      //     ...state,
      //     basketItems: state.basketItems.filter((x) => x.product !== action.payload && x.chain!==action.payload.chain && x.length!==action.payload.length &&  x.size!==action.payload.size),
      //   }

      // }
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
    case BASKET_CLEAR_ITEMS:
      return {
        ...state,
        basketItems: [],
      }
    default:
      return state
  }
}