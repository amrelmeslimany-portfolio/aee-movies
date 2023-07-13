import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { refreshLogin } from "./auth-cruds";
import useSuccessedModal from "../../hooks/useSuccessedModal";

const initState = {
  user: null,
  isLogin: false,
  loggedSuccessed: null,
};

export const AuthContext = createContext({
  ...initState,
  dispatch: () => {},
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  const successedModal = useSuccessedModal();

  useEffect(() => {
    refreshLogin(dispatch);
  }, []);

  useEffect(() => {
    successedModal(state.loggedSuccessed);
  }, [state.loggedSuccessed, successedModal]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
