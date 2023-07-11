import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import Error from "../UI/Error";
import Loading from "../UI/Loading";

import { useContext } from "react";
import { AuthContext } from "../../context/auth/auth-context";

function PostsList({ status, posts, nextFetchHandler }) {
  const { user } = useContext(AuthContext);
  const userID = user?.id || "";

  return (
    <div className="posts-wrap">
      <InfiniteScroll
        loader={!status.error && <Loading />}
        dataLength={!status.isLoading && posts.length}
        hasMore={!status.isLoading && status.isMore}
        next={nextFetchHandler}
      >
        {posts.map((item) => (
          <Post
            data={item}
            key={item.postID}
            isMyPost={item.postUserID === userID}
          />
        ))}
      </InfiniteScroll>
      {status.isLoading && <Loading />}
      {!status.isLoading && status.error && <Error message={status.error} />}
      {!status.isLoading && !status.error && posts.length === 0 && (
        <Error message="لايوجد أخبار الأن, يمكنك اضافةاول خبر جديد من الزر الي فوق." />
      )}
    </div>
  );
}

export default PostsList;
