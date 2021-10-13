import axios from 'axios'
import { 
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_SIGNOUT,
  USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILURE,
  USER_DETAILS_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_FAILURE,
  USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAILURE, USER_UPDATE_RESET, 
  USER_DETAILS_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAILURE, USER_LIST_RESET,
  USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAILURE, USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_SUCCESS, 
  USER_ADMIN_UPDATE_FAILURE, USER_ADMIN_UPDATE_RESET
} from "../constants/userConstants"

import { ORDER_LIST_OF_USER_RESET } from '../constants/orderConstants'

export const signIn=(email,password) => async(dispatch)=>{
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    //Add header content type and token
    const config={
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const{data}=await axios.post('/api/users/login', {email,password}, config)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('userInformation',JSON.stringify(data))
  } catch(error){
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
    })

  }
}

export const signOut =()=>(dispatch)=>{
  //Remove from local storage here in the action and dispatch the reducer which actually updates state adnd returns an empty object
  localStorage.removeItem('userInformation')
  dispatch({type:USER_SIGNOUT})
  dispatch({type:USER_DETAILS_RESET})
  dispatch({type:ORDER_LIST_OF_USER_RESET})
  //Clear user list so that non-admin users cannot see them
  dispatch({type: USER_LIST_RESET})
}


export const register=(name, email,password) => async(dispatch)=>{
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })
    //Add header content type and token
    const config={
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const{data}=await axios.post('/api/users', {name, email, password}, config)
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })
    //Immediately sign in after registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    localStorage.setItem('userInformation',JSON.stringify(data))
  } catch(error){
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
    })

  }
}

export const getUserDetails=(id) => async(dispatch,getState)=>{
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    //Destructure state using the built-in redux getstate function to get userinfo
    const {userLogin:{userInformation}} = getState()
    const config={
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`
      }
    }
    const{data}=await axios.get(`/api/users/${id}`, config)
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })

  } catch(error){
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
    })

  }
}


export const updateUser=(user) => async(dispatch,getState)=>{
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })
    //Destructure state using the built-in redux getstate function to get userinfo
    const {userLogin:{userInformation}} = getState()
    const config={
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInformation.token}`
      }
    }
    const{data}=await axios.put(`/api/users/profile`, user, config)
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    })

  } catch(error){
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
    })

  }
}


export const listUsers=() => async(dispatch,getState)=>{
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })
    //Destructure state using the built-in redux getstate function to get userinfo
    const {userLogin:{userInformation}} = getState()
    const config={
      headers: {
        Authorization: `Bearer ${userInformation.token}`
      }
    }
    const{data}=await axios.get(`/api/users`, config)
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })

  } catch(error){
    dispatch({
      type: USER_LIST_FAILURE,
      payload: error.response && error.response.data.message 
        ? error.response.data.message
        : error.message,
    })

  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInformation },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInformation.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAILURE,
      payload: message,
    })
  }
}

export const adminUpdateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({ type: USER_ADMIN_UPDATE_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    dispatch({ type: USER_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_ADMIN_UPDATE_FAILURE,
      payload: message,
    })
  }
}

export const guestUpdate=()=>{
  try{
    dispatch({type: GUEST_SUCCESS})
  }
  catch(error){
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    // dispatch({
    //   type: GUEST_FAILURE,
    //   payload: message,
    // })
  }
  
}