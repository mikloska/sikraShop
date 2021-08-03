import {ITEM_COUNT_CHANGE} from '../constants/itemCountConstants'

export const itemCountReducer =(state=0, action)=>{
  const amount = action.payload
  switch(action.type){
    case ITEM_COUNT_CHANGE: return amount

    default: return state 
  }
}