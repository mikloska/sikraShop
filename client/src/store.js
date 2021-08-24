import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer, productDeleteReducer } from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';
import {itemCountReducer} from './reducers/itemCountReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userListReducer, userDeleteReducer, userAdminUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListOfUserReducer } from './reducers/orderReducers';

//Create the item in state as the key and link it to its reducer
const reducer =  combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  basket:basketReducer,
  itemCount: itemCountReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userAdminUpdate: userAdminUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListOfUser: orderListOfUserReducer,
  userList: userListReducer,
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