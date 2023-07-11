import { createContext, useReducer } from "react";
import moviesReducer from "./moviesReducer";

const initState = {
  items: [],
  isFetching: false,
  error: false,
  filteredItems: [],
  isFiltering: false,
  filterError: false,
  categoriedItems: {
    items: [],
    isMore: true,
  },
};

export const MoviesContext = createContext({
  ...initState,
  dispatch: () => {},
});

const MoviesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initState);

  return (
    <MoviesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
