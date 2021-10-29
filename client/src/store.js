import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, 
productReviewCreateReducer, productTopRatedReducer, productListCategoryReducer, productImageDeleteReducer} from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';
import {itemCountReducer} from './reducers/itemCountReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer, userListReducer, userDeleteReducer, userAdminUpdateReducer,guestReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListOfUserReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers';
import {statesReducer,provincesReducer,countriesReducer} from './reducers/locationReducers'

//Create the item in state as the key and link it to its reducer
const reducer =  combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productListCategory:productListCategoryReducer,
  productImageDelete:productImageDeleteReducer,
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
  orderDeliver: orderDeliverReducer,
  orderListOfUser: orderListOfUserReducer,
  orderList:orderListReducer,
  userList: userListReducer,
  states: statesReducer,
  provinces: provincesReducer,
  countries: countriesReducer,
  guest: guestReducer
})
//Check to see if it`s in state. If so, put it into state.
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const basketFromStorage = localStorage.getItem('basketItems')?JSON.parse(localStorage.getItem('basketItems')) : []
const userInformationFromStorage = localStorage.getItem('userInformation')?JSON.parse(localStorage.getItem('userInformation')) : null
const initialState = {
  basket: {basketItems: basketFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod:'PayPal'},
  userLogin: {userInformation:userInformationFromStorage},
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 


export default store