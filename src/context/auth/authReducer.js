import {
  ALERT_LOGGEDIN_SUCCESS,
  UPDATE_USER_PROFILE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "./AuthActions";

export const authReducer = (state, action) => {
  let updatedState;
  switch (action.type) {
    case USER_LOGIN_SUCCESS().type:
      updatedState = { user: action.payload, isLogin: true };
      return { ...state, ...updatedState };
    case UPDATE_USER_PROFILE().type:
      updatedState = {
        user: {
          ...state.user,
          bio: action.payload.bio,
          name: action.payload.name,
          profileImg: action.payload.profileImg,
        },
      };
      return { ...state, ...updatedState };
    case ALERT_LOGGEDIN_SUCCESS().type:
      return { ...state, loggedSuccessed: action.payload };
    case USER_LOGOUT_SUCCESS().type:
      return { ...state, user: null, isLogin: false, loggedSuccessed: null };
    default:
      return state;
  }
};
