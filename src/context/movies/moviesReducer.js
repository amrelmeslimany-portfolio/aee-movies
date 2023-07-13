import { handleTitle } from "../../helpers";
import {
  erorrMoviesGenreGet,
  pendingMoviesGenreGet,
  startMoviesGenreGet,
  startMoviesFilterGet,
  pendingMoviesFilterGet,
  erorrMoviesFilterGet,
  startCategoriedMovies,
  pendingCategoriedMovies,
  erorrCategoriedMovies,
  clearCategoriedMovies,
} from "./moviesActions";

const moviesReducer = (state, action) => {
  switch (action.type) {
    case startMoviesGenreGet().type:
      return {
        ...state,
        items: [],
        isFetching: true,
        error: false,
      };
    case pendingMoviesGenreGet().type:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
        error: false,
      };
    case erorrMoviesGenreGet().type:
      return {
        ...state,
        items: [],
        isFetching: false,
        error: action.payload,
      };
    case startMoviesFilterGet().type:
      return {
        ...state,
        filteredItems: [],
        isFiltering: true,
        filterError: false,
      };
    case pendingMoviesFilterGet().type:
      return {
        ...state,
        filteredItems: action.payload,
        isFiltering: false,
        filterError: false,
      };
    case erorrMoviesFilterGet().type:
      return {
        ...state,
        filteredItems: [],
        isFiltering: false,
        filterError: action.payload,
      };
    case startCategoriedMovies().type:
      return {
        ...state,
        categoriedItems: {
          ...state.categoriedItems,
          items: state.categoriedItems.items,
        },
      };
    case pendingCategoriedMovies().type:
      return {
        ...state,
        categoriedItems: {
          ...action.payload,
          items: [
            ...state.categoriedItems.items,
            ...handleTitle(action.payload.items),
          ],
        },
      };
    case erorrCategoriedMovies().type:
      return {
        ...state,
        categoriedItems: {
          ...state.categoriedItems,
          items: state.categoriedItems.items,
        },
      };
    case clearCategoriedMovies().type:
      return {
        ...state,
        categoriedItems: {
          ...state.categoriedItems,
          items: [],
        },
      };
    default:
      return state;
  }
};

export default moviesReducer;
