import { axiosInstance } from "../../config";
import { handleErrors } from "../../helpers";
import {
  ADD_TO_FAV,
  CLEAR_FAV,
  CLEAR_VISITEDBEFORE,
  REMOVE_FAVOURITE_ITEM,
  REMOVE_VISITEDBEFORE_ITEM,
} from "./favouriteActions";

// @ Add to favourite
export const getList = async (listType, setState) => {
  setState((prev) => ({ ...prev, isLoading: true, error: null }));
  try {
    const result = await axiosInstance.get("/lists", {
      params: { listType },
    });
    setState((prev) => ({ ...prev, items: result.data }));
  } catch (error) {
    setState((prev) => ({ ...prev, error: handleErrors(error), items: [] }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};

// @ Add to favourite
export const addToFavourite = async (movieID, setState, dispatch) => {
  setState((prev) => ({ ...prev, isLoading: true, error: null }));
  try {
    await axiosInstance.post("/lists/add", { movieID });
    dispatch(ADD_TO_FAV(movieID));
  } catch (error) {
    setState((prev) => ({ ...prev, error: handleErrors(error) }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};

// @ remove all favourites list
export const removeFavouritesAll = async (listType, setState, dispatch) => {
  setState((prev) => ({ ...prev, isLoading: true, error: null }));
  try {
    const result = await axiosInstance.post("/lists/remove_all", { listType });
    setState((prev) => ({ ...prev, items: [], successMessage: result.data }));
    if (listType === "favourites") dispatch(CLEAR_FAV());
    else if (listType === "visitedBefore") dispatch(CLEAR_VISITEDBEFORE());
  } catch (error) {
    setState((prev) => ({ ...prev, error: handleErrors(error) }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};
// @ remove all favourites list
export const removeFavouritesItem = async (
  listType,
  movieID,
  setState,
  dispatch
) => {
  setState((prev) => ({
    ...prev,
    isLoading: true,
    error: null,
    success: null,
  }));
  try {
    const result = await axiosInstance.post("/lists/remove_item", {
      movieID,
      listType,
    });

    if (listType === "favourites") dispatch(REMOVE_FAVOURITE_ITEM(movieID));
    else if (listType === "visitedBefore")
      dispatch(REMOVE_VISITEDBEFORE_ITEM(movieID));

    setState((prev) => ({ ...prev, success: result.data }));
  } catch (error) {
    setState((prev) => ({ ...prev, error: handleErrors(error) }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};
