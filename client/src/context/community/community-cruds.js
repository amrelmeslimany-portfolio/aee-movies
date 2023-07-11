import {
  ADD_POST,
  INIT_POSTS,
  INIT_USER_POSTS,
  REMOVE_POST,
  UPDATE_LKES,
} from "./community-actions";
import axios from "axios";
import { handleErrors } from "../../helpers";

export const getPosts = async (
  userID,
  page,
  setState,
  dispatch,
  filters = null
) => {
  setState((prev) => ({
    ...prev,
    isLoading: true,
    error: null,
  }));
  try {
    const params = {
      userID,
      page,
      sorting: filters,
    };
    const { data } = await axios.get("/community", {
      params,
    });

    setState((prev) => ({ ...prev, isMore: data.isMore }));

    if (userID) dispatch(INIT_USER_POSTS(data.items));
    else dispatch(INIT_POSTS(data.items));
  } catch (error) {
    setState((prev) => ({
      ...prev,
      isMore: false,
      error: handleErrors(error),
    }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};

export const addPost = async (post, setState, dispatch) => {
  setState((prev) => ({
    ...prev,
    isLoading: true,
    error: null,
    isSuccess: false,
  }));

  try {
    const { data } = await axios({
      method: "post",
      url: "/community/add",
      data: post,
      timeout: 100000,
      headers: { "Content-Type": "multipart/form-data" },
    });
    setState((prev) => ({ ...prev, isSuccess: true }));
    dispatch(ADD_POST(data));
  } catch (error) {
    console.log(error);
    setState((prev) => ({ ...prev, error: handleErrors(error) }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};

export const likePost = async (id, setState, dispatch) => {
  setState((prev) => ({
    ...prev,
    isLoading: true,
    error: null,
  }));
  try {
    const { data } = await axios.put(`/community/like/${id}`);
    dispatch(UPDATE_LKES({ id, likes: data.likes }));
  } catch (error) {
    console.log(error);
    setState((prev) => ({ ...prev, error: handleErrors(error) }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};

export const removePost = async (postid, setState, dispatch, message) => {
  setState(true);
  try {
    const { data } = await axios.delete(`/community/delete/${postid}`);
    dispatch(REMOVE_POST(postid));
    message.success(data.success);
  } catch (error) {
    message.error(handleErrors(error));
  }
  setState(false);
};
