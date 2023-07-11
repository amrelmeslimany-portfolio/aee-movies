export const INIT_POSTS = (posts) => ({
  type: "INIT_POSTS",
  payload: posts,
});

export const INIT_USER_POSTS = (posts) => ({
  type: "INIT_USER_POSTS",
  payload: posts,
});

export const ADD_POST = (post) => ({
  type: "ADD_POST",
  payload: post,
});

export const REMOVE_POST = (postid) => ({
  type: "REMOVE_POST",
  payload: postid,
});

export const SET_ISMORE = () => ({
  type: "SET_ISMORE",
});

export const UPDATE_LKES = (data) => ({
  type: "UPDATE_LKES",
  payload: data,
});

export const CLEAR_POST = () => ({
  type: "CLEAR_POST",
});
export const CLEAR_USER_POSTS = () => ({
  type: "CLEAR_USER_POSTS",
});
