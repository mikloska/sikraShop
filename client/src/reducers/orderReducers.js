import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE, ORDER_PAY_REQUEST, ORDER_PAY_FAILURE, ORDER_PAY_SUCCESS, ORDER_PAY_RESET, ORDER_LIST_OF_USER_REQUEST,
  ORDER_LIST_OF_USER_SUCCESS, ORDER_LIST_OF_USER_FAILURE, ORDER_LIST_OF_USER_RESET, ORDER_LIST_FAILURE, ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST, ORDER_DELIVER_FAILURE, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderListOfUserReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_OF_USER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_OF_USER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_OF_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
      //Need this so other users can't see on first render
    case ORDER_LIST_OF_USER_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}