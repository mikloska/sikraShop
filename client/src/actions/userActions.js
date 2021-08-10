import axios from 'axios'
import { 
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT,
  USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILURE,
  USER_DETAILS_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_FAILURE,
  USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAILURE, USER_UPDATE_RESET
} from "../constants/userConstants"

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
  dispatch({type:USER_LOGOUT})
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