import { useContext } from "react";
import AddPost from "../components/Community/AddPost";
import PostsList from "../components/Community/PostsList";
import { CommunityContext } from "../context/community/community-context";
import useFetchPosts from "../hooks/useFetchPosts";
import { FilterPosts } from "../components/Community/FilterPosts";
import { CLEAR_POST } from "../context/community/community-actions";
import useDocTitle from "../hooks/useDocTitle";

function Community() {
  const { posts, dispatch } = useContext(CommunityContext);
  const {
    setPage,
    nextFetchHandler: nextFetchScrollHandler,
    postsStatus: status,
  } = useFetchPosts(null, dispatch);

  const filterChangeHander = () => {
    setPage(1);
    dispatch(CLEAR_POST());
  };

  useDocTitle("المجتمع");

  return (
    <div className="community-page">
      <AddPost />
      <FilterPosts
        onFilterChange={filterChangeHander}
        doRequest={posts?.length >= 2}
      />
      <PostsList
        nextFetchHandler={nextFetchScrollHandler}
        posts={posts}
        status={status}
      />
    </div>
  );
}

export default Community;
