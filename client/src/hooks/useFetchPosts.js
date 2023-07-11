import { useEffect, useState } from "react";
import { getPosts } from "../context/community/community-cruds";
import { CLEAR_USER_POSTS } from "../context/community/community-actions";
import { useSearchParams } from "react-router-dom";

const postInitStatus = {
  isLoading: false,
  error: null,
  isMore: true,
};

const useFetchPosts = (userID, dispatch) => {
  const [postsStatus, setPostsStatus] = useState(postInitStatus);
  const [page, setPage] = useState(1);
  const [queries] = useSearchParams();

  const nextFetchScrollHandler = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (userID && page === 1) dispatch(CLEAR_USER_POSTS());
    getPosts(userID, page, setPostsStatus, dispatch, queries.get("filters"));
  }, [page, userID, dispatch, queries]);

  return {
    nextFetchHandler: nextFetchScrollHandler,
    postsStatus,
    setPage,
  };
};

export default useFetchPosts;
