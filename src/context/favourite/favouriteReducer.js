import {
  ADD_TO_FAV,
  ADD_VISITEDBEFORE_ITEM,
  CLEAR_FAV,
  CLEAR_VISITEDBEFORE,
  INIT_LISTS,
  REMOVE_FAVOURITE_ITEM,
  REMOVE_VISITEDBEFORE_ITEM,
} from "./favouriteActions";

export const favouriteReducer = (state, action) => {
  let filtered;
  switch (action.type) {
    case INIT_LISTS().type:
      return {
        ...state,
        favourites: action.payload.favourites,
        visitedBefore: action.payload.visitedBefore,
      };
    case ADD_TO_FAV().type:
      return { ...state, favourites: [...state.favourites, action.payload] };
    case REMOVE_FAVOURITE_ITEM().type:
      filtered = state.favourites.filter((item) => item !== action.payload);
      return { ...state, favourites: [...filtered] };
    case CLEAR_FAV().type:
      return { ...state, favourites: [] };
    case ADD_VISITEDBEFORE_ITEM().type:
      return {
        ...state,
        visitedBefore: [...state.visitedBefore, action.payload],
      };
    case REMOVE_VISITEDBEFORE_ITEM().type:
      filtered = state.visitedBefore.filter((item) => item !== action.payload);
      return { ...state, visitedBefore: [...filtered] };

    case CLEAR_VISITEDBEFORE().type:
      return { ...state, visitedBefore: [] };
    default:
      return state;
  }
};
