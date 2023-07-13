//  @ Create new user
export const USER_LOGIN_SUCCESS = (user) => ({
  type: "USER_LOGIN_SUCCESS",
  payload: user,
});
//  @ Update user info
export const UPDATE_USER_PROFILE = (user) => ({
  type: "UPDATE_USER_PROFILE",
  payload: user,
});
//  @ Logout
export const USER_LOGOUT_SUCCESS = () => ({
  type: "USER_LOGOUT_SUCCESS",
});

// @ Alert Successed Logged in
export const ALERT_LOGGEDIN_SUCCESS = (message) => ({
  type: "ALERT_LOGGEDIN_SUCCESS",
  payload: message,
});
