import { handleDuplicatedPost, updateLikesPost } from "../../helpers";
import {
  ADD_POST,
  CLEAR_POST,
  CLEAR_USER_POSTS,
  INIT_POSTS,
  INIT_USER_POSTS,
  REMOVE_POST,
  UPDATE_LKES,
} from "./community-actions";

const communityReducer = (state, action) => {
  let updated;
  switch (action.type) {
    case INIT_POSTS().type:
      updated = [...state.posts, ...action.payload];
      return {
        ...state,
        posts: handleDuplicatedPost(updated),
      };
    case INIT_USER_POSTS().type:
      updated = [...state.userPosts, ...action.payload];
      return {
        ...state,
        userPosts: handleDuplicatedPost(updated),
      };
    case ADD_POST().type:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case UPDATE_LKES().type:
      let updatedPosts = updateLikesPost(state.posts, action);
      let updatedUserPosts = state.userPosts.length
        ? updateLikesPost(state.userPosts, action)
        : state.userPosts;
      return {
        ...state,
        posts: updatedPosts,
        userPosts: updatedUserPosts,
      };
    case REMOVE_POST().type:
      return {
        ...state,
        posts: state.posts.filter((post) => post.postID !== action.payload),
        userPosts: state.userPosts.length
          ? state.userPosts.filter((post) => post.postID !== action.payload)
          : state.userPosts,
      };
    case CLEAR_POST().type:
      return { ...state, posts: [] };
    case CLEAR_USER_POSTS().type:
      return { ...state, userPosts: [] };
    default:
      return state;
  }
};

export default communityReducer;
