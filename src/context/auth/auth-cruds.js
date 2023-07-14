import { axiosInstance } from "../../config";

import {
  ALERT_LOGGEDIN_SUCCESS,
  UPDATE_USER_PROFILE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "./AuthActions";
import { handleErrors } from "../../helpers";

// @ Create new user
export const createNewUser = async (user, setState, dispatch) => {
  setState((prev) => ({ ...prev, isLoading: true, error: null }));
  try {
    const result = await axiosInstance.post("/auth/newuser", user);
    dispatch(USER_LOGIN_SUCCESS(result.data.user));
    dispatch(ALERT_LOGGEDIN_SUCCESS("تم انشاء حساب جديد بنجاح"));
  } catch (error) {
    setState((prev) => ({ ...prev, error: handleErrors(error) }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};

// @ Create login
export const loginApi = async (user, setState, dispatch) => {
  setState((prev) => ({ ...prev, isLoading: true, error: null }));
  try {
    const result = await axiosInstance.post("/auth/login", user);
    dispatch(USER_LOGIN_SUCCESS(result.data.user));
    dispatch(ALERT_LOGGEDIN_SUCCESS("تم تسجيل الدخول بنجاح"));
  } catch (error) {
    console.log(error);
    setState((prev) => ({ ...prev, error: handleErrors(error) }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};

// @ refresh login (presist user login)
export const refreshLogin = (userDispatch) => {
  axiosInstance
    .get("/auth/me")
    .then((result) => {
      if (result.data.user) {
        userDispatch(USER_LOGIN_SUCCESS(result.data.user));
      }
    })
    .catch((error) => {});
};
// @ logout
export const logoutAPI = (dispatch) => {
  axiosInstance
    .post("/auth/logout")
    .then((result) => {
      dispatch(USER_LOGOUT_SUCCESS());
    })
    .catch((error) => {
      if (error.response?.status === 401) dispatch(USER_LOGOUT_SUCCESS());
      console.log(error);
    });
};

// @ Edit profile
export const editProfileAPI = async (user, setState, dispatch) => {
  setState((prev) => ({
    ...prev,
    isLoading: true,
    error: null,
    success: false,
  }));
  try {
    const result = await axiosInstance.put("/user/update", user);
    dispatch(UPDATE_USER_PROFILE(result.data));
    setState((prev) => ({ ...prev, success: true }));
  } catch (error) {
    console.log(error);
    setState((prev) => ({ ...prev, error: handleErrors(error) }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};
