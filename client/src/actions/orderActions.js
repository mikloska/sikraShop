import axios from 'axios'
import { BASKET_CLEAR_ITEMS, BASKET_CLEAR_ADDRESS,BASKET_RESET, BASKET_CLEAR_GUEST_INFO, BASKET_CLEAR_AFTER_ORDER} from '../constants/basketConstants'
// BASKET_CLEAR_SHIPPING_PRICE, BASKET_CLEAR_ITEMS_PRICE, BASKET_CLEAR_TOTAL_PRICE, BASKET_CLEAR_TAX_PRICE
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE, ORDER_CREATE_RESET,ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE, ORDER_PAY_REQUEST, ORDER_PAY_FAILURE, ORDER_PAY_SUCCESS, ORDER_PAY_RESET, ORDER_LIST_OF_USER_REQUEST,
  ORDER_LIST_OF_USER_SUCCESS, ORDER_LIST_OF_USER_FAILURE, ORDER_LIST_OF_USER_RESET, ORDER_LIST_FAILURE, ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST, ORDER_SHIP_FAILURE, ORDER_SHIP_SUCCESS, ORDER_SHIP_REQUEST, ORDER_SHIP_RESET
} from '../constants/orderConstants'
import { signOut } from './userActions'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: BASKET_CLEAR_ITEMS,
      payload: data,
    })
    dispatch({
      type: BASKET_CLEAR_AFTER_ORDER,
      payload: data,
    })
    localStorage.removeItem('basketItems')
    dispatch({type: ORDER_CREATE_RESET})
    // dispatch({type: BASKET_RESET, payload:data,})
    localStorage.removeItem('basketItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(signOut())
    }
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload: message,
    })
  }
}

export const createGuestOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })


    const { data } = await axios.post(`/api/orders/guest`, order)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    // dispatch({
    //   type: BASKET_CLEAR_ADDRESS,
    //   payload:data,
    // })
    dispatch({
      type: BASKET_CLEAR_ITEMS,
      payload: data,
    })
    dispatch({
      type: BASKET_CLEAR_AFTER_ORDER,
      payload: data,
    })
    localStorage.removeItem('basketItems')
    dispatch({type: ORDER_CREATE_RESET})
    dispatch({
      type: BASKET_CLEAR_GUEST_INFO,
      payload:data,
    })
    dispatch({})
    localStorage.removeItem('basketItems')
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(signOut())
    }
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: message,
    })
  }
}

export const getGuestOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })



    const { data } = await axios.get(`/api/orders/${id}/guest`)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload: message,
    })
  }
}


export const payGuestOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })


    const { data } = await axios.put(`/api/orders/${orderId}/guest/pay`,paymentResult)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_PAY_FAILURE,
      payload: message,
    })
  }
}




export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`,
      },
    }

    const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(signOut())
    }
    dispatch({
      type: ORDER_PAY_FAILURE,
      payload: message,
    })
  }
}

export const shipOrder = (order, trackingNumber, trackingLink) => async (dispatch, getState) => {
  try {
    // console.log('trackingNumber: ', trackingNumber)
    dispatch({
      type: ORDER_SHIP_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/ship`,
      {trackingNumber, trackingLink},
      config
    )

    dispatch({
      type: ORDER_SHIP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(signOut())
    }
    dispatch({
      type: ORDER_SHIP_FAILURE,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_OF_USER_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: ORDER_LIST_OF_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(signOut())
    }
    dispatch({
      type: ORDER_LIST_OF_USER_FAILURE,
      payload: message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(signOut())
    }
    dispatch({
      type: ORDER_LIST_FAILURE,
      payload: message,
    })
  }
}