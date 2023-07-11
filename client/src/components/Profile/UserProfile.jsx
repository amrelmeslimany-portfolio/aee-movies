import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import Error from "../UI/Error";
import { CommunityContext } from "../../context/community/community-context";
import useFetchPosts from "../../hooks/useFetchPosts";
import { FilterPosts } from "../Community/FilterPosts";
import ProfileHeader from "./ProfileHeader";
import PostsList from "../Community/PostsList";
import axios from "axios";
import { handleErrors } from "../../helpers";
import { AuthContext } from "../../context/auth/auth-context";
import { CLEAR_USER_POSTS } from "../../context/community/community-actions";
import useDocTitle from "../../hooks/useDocTitle";

const userInitStatus = {
  isLoading: false,
  error: null,
  user: null,
};

const getUserAPI = async (userid, setState) => {
  setState((prev) => ({
    ...prev,
    isLoading: true,
    error: null,
    user: null,
  }));
  try {
    const { data } = await axios.get(`/user/${userid}`);
    setState((prev) => ({ ...prev, user: data }));
  } catch (error) {
    setState((prev) => ({
      ...prev,
      error: handleErrors(error),
    }));
  }
  setState((prev) => ({ ...prev, isLoading: false }));
};

function UserProfile() {
  const { user } = useContext(AuthContext);
  const { dispatch, userPosts } = useContext(CommunityContext);
  const [userStatus, setUserStatus] = useState(userInitStatus);
  const { userid } = useParams();
  const { nextFetchHandler, postsStatus, setPage } = useFetchPosts(
    userid,
    dispatch
  );
  const navigate = useNavigate();

  const filterChangeHander = () => {
    setPage(1);
    dispatch(CLEAR_USER_POSTS());
  };

  useEffect(() => {
    if (userid) {
      if (user?.id === userid) navigate("/profile/me");
      else getUserAPI(userid, setUserStatus);
    }
  }, [userid, navigate, user]);

  if (userStatus.isLoading) return <Loading />;
  if (userStatus.error) return <Error message={userStatus.error} />;

  if (userStatus.user) {
    return (
      <>
        <ProfileHeader
          user={{
            email: userStatus.user.email,
            name: userStatus.user.name,
            profileImg: userStatus.user.profileImg,
            bio: userStatus.user.bio,
            favLength: userStatus.user.favourites,
            visitedLength: userStatus.user.visited,
          }}
        />
        <FilterPosts
          onFilterChange={filterChangeHander}
          doRequest={userPosts?.length >= 2}
        />
        <PostsList
          nextFetchHandler={nextFetchHandler}
          status={postsStatus}
          posts={userPosts}
        />
      </>
    );
  }
}

export default UserProfile;
