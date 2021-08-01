import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { basketReducer } from './reducers/basketReducers';


const reducer =  combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  basket:basketReducer,
})

const basketFromStorage = localStorage.getItem('basketItems')?JSON.parse(localStorage.getItem('basketItems')) : []
const initialState = {
  basket: {basketItems: basketFromStorage}
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 


export default store