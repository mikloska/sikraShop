import {ITEM_COUNT_CHANGE} from '../constants/itemCountConstants'


export const changeBadge = (qty) =>{
  return{
    type: ITEM_COUNT_CHANGE,
    payload: qty
  }
  // dispatch({
  // type: ITEM_COUNT_INCREMENT,
  // payload: qty
  // })
}

