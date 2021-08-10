import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';
import {itemCountReducer} from './reducers/itemCountReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducers';

//Create the item in state as the key and link it to its reducer
const reducer =  combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  basket:basketReducer,
  itemCount: itemCountReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
})
//Check to see if it`s in state. If so, put it into state.
const basketFromStorage = localStorage.getItem('basketItems')?JSON.parse(localStorage.getItem('basketItems')) : []
const userInformationFromStorage = localStorage.getItem('userInformation')?JSON.parse(localStorage.getItem('userInformation')) : null
const initialState = {
  basket: {basketItems: basketFromStorage},
  userLogin: {userInformation:userInformationFromStorage},
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 


export default store