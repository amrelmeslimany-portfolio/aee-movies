import { useContext, useState } from "react";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";
import { Button } from "antd";
import GuardMessage from "../../components/UI/GuardMessage";
import { AuthContext } from "../../context/auth/auth-context";
import { CommunityContext } from "../../context/community/community-context";
import { likePost } from "../../context/community/community-cruds";

function LikeButton({ postID, likes }) {
  const { isLogin, user } = useContext(AuthContext);
  const { dispatch } = useContext(CommunityContext);

  const isLike = Boolean(likes[user?.id]);

  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState({ isLoading: false, error: null });

  const likeBtnHandler = () => {
    if (isLogin) likePost(postID, setStatus, dispatch);
    else setToggle(true);
  };

  const closeModalHandler = () => setToggle(false);

  return (
    <>
      <Button
        onClick={likeBtnHandler}
        icon={isLike ? <Favorite /> : <FavoriteBorderOutlined />}
        shape="circle"
        type="text"
        className={`post-love-button ${isLike ? "active" : ""}`}
        loading={status.isLoading}
      />

      {!isLogin && (
        <GuardMessage
          message="لازم تسجل دخولك علشان تضيف لايك او تنشئ خبر"
          onClose={closeModalHandler}
          toggleModal={toggle}
        />
      )}
    </>
  );
}

export default LikeButton;
