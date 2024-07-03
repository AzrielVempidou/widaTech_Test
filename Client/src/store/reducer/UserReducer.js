// UserReducer.js
import {
  USER_REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS
} from '../action/actionType';

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  registrationMessage: ''
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        registrationMessage: action.payload.message
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        isLoggedIn: true
      };
    default:
      return state;
  }
};

export default UserReducer;
