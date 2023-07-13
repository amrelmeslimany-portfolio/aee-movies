//  @ INIT Fav & Visited
export const INIT_LISTS = (lists) => ({
  type: "INIT_LISTS",
  payload: lists,
});

// @ FAVOURITES
//  @ add to favourite
export const ADD_TO_FAV = (movieID) => ({
  type: "ADD_TO_FAV",
  payload: movieID,
});
//  @ remove item from favourite list
export const REMOVE_FAVOURITE_ITEM = (movieID) => ({
  type: "REMOVE_FAVOURITE_ITEM",
  payload: movieID,
});
//  @ clear favourite state
export const CLEAR_FAV = () => ({
  type: "CLEAR_FAV",
});

// @ VISITED BEFORE
//  @ add to visited before
export const ADD_VISITEDBEFORE_ITEM = (movieID) => ({
  type: "ADD_VISITEDBEFORE_ITEM",
  payload: movieID,
});
//  @ remove item visited before
export const REMOVE_VISITEDBEFORE_ITEM = (movieID) => ({
  type: "REMOVE_VISITEDBEFORE_ITEM",
  payload: movieID,
});

//  @ clear favourite state
export const CLEAR_VISITEDBEFORE = () => ({
  type: "CLEAR_VISITEDBEFORE",
});
