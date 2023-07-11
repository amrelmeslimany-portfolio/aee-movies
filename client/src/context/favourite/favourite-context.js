import { createContext, useContext, useEffect, useReducer } from "react";
import { favouriteReducer } from "./favouriteReducer";
import { AuthContext } from "../auth/auth-context";
import { INIT_LISTS } from "./favouriteActions";

const initState = {
  favourites: [],
  visitedBefore: [],
};

export const FavouriteContext = createContext({
  ...initState,
  dispatch: () => {},
});

const FavouriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouriteReducer, initState);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const payload = {
        favourites: user.favourites,
        visitedBefore: user.visited,
      };
      dispatch(INIT_LISTS(payload));
    }
  }, [user, dispatch]);

  return (
    <FavouriteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;
