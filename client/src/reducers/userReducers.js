import { 
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_SIGNOUT,
  USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILURE,
  USER_DETAILS_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_FAILURE,
  USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAILURE, USER_UPDATE_RESET, USER_DETAILS_RESET
} from "../constants/userConstants"


export const userLoginReducer = (state={},action) => {
  switch(action.type){
    case USER_LOGIN_REQUEST:
      return {loading:true}
    case USER_LOGIN_SUCCESS:
      return {loading:false, userInformation: action.payload}
    case USER_LOGIN_FAILURE:
      return {loading: false, error: action.payload}
    case USER_SIGNOUT:
      return {}
    default:
      return state;
  }
}

export const userRegisterReducer = (state={},action) => {
  switch(action.type){
    case USER_REGISTER_REQUEST:
      return {loading:true}
    case USER_REGISTER_SUCCESS:
      return {loading:false, userInformation: action.payload}
    case USER_REGISTER_FAILURE:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}


export const userDetailsReducer = (state={user:{}},action) => {
  switch(action.type){
    case USER_DETAILS_REQUEST:
      return {...state,loading:true}
    case USER_DETAILS_SUCCESS:
      return {loading:false, user: action.payload}
    case USER_DETAILS_FAILURE:
      return {loading: false, error: action.payload}
    default:
      return state;
    //Need this so other users can't see on first render
    case USER_DETAILS_RESET:
      return { orders: [] }
  }
}


export const userUpdateReducer = (state={},action) => {
  switch(action.type){
    case USER_UPDATE_REQUEST:
      return {loading:true}
    case USER_UPDATE_SUCCESS:
      return {loading:false, success:true, userInformation: action.payload}
    case USER_UPDATE_FAILURE:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}