import { useContext } from "react";
import { FavouriteContext } from "../../context/favourite/favourite-context";
import ProfileHeader from "./ProfileHeader";
import PostsList from "../Community/PostsList";
import useFetchPosts from "../../hooks/useFetchPosts";
import { CommunityContext } from "../../context/community/community-context";
import { FilterPosts } from "../Community/FilterPosts";
import { CLEAR_USER_POSTS } from "../../context/community/community-actions";
import useDocTitle from "../../hooks/useDocTitle";

function MyProfile({ user }) {
  const { dispatch, userPosts } = useContext(CommunityContext);
  const { email, name, bio, id, profileImg } = user;
  const { favourites, visitedBefore } = useContext(FavouriteContext);
  const { nextFetchHandler, postsStatus, setPage } = useFetchPosts(
    id,
    dispatch
  );

  const filterChangeHander = () => {
    setPage(1);
    dispatch(CLEAR_USER_POSTS());
  };

  useDocTitle(`${name} | البروفايل`);

  return (
    <>
      <ProfileHeader
        isMyProfile={true}
        user={{
          email,
          name,
          bio,
          profileImg,
          favLength: favourites.length,
          visitedLength: visitedBefore.length,
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

export default MyProfile;
