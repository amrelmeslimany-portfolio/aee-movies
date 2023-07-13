import { memo } from "react";
import { Avatar, Image, Typography } from "antd";
import { AccessTimeOutlined } from "@material-ui/icons";
import TimeAgo from "react-timeago";
import arabicLanguage from "react-timeago/lib/language-strings/ar";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import LikeButton from "./LikeButton";
import { baseURL, isImg } from "../../helpers";
import { Link } from "react-router-dom";
import RemovePost from "./RemovePost";
import "./Post.less";

const formatter = buildFormatter(arabicLanguage);

const Post = ({ data, isMyPost }) => {
  const profilePath = isMyPost ? "/profile/me" : `/profile/${data.postUserID}`;

  const headerUserInfo = (
    <>
      {" "}
      <Typography.Title level={5}>{data.postUsername}</Typography.Title>
      <small className="post-timeago">
        <AccessTimeOutlined />
        <TimeAgo date={data.postCreatedAt} formatter={formatter} />
      </small>
    </>
  );

  return (
    <div className="post-item">
      <section className="post-header">
        <div className="post-userprofile">
          {data.postProfile ? (
            <Avatar size={45} src={`${baseURL}${data.postProfile}`} />
          ) : (
            <Avatar size={45}>{data.postUsername}</Avatar>
          )}
        </div>
        <article className="post-userinfo">
          {!data.postUserID && !isMyPost ? (
            <div className="wrap">{headerUserInfo}</div>
          ) : (
            <Link to={profilePath} className="wrap link">
              {headerUserInfo}
            </Link>
          )}
        </article>
        {isMyPost && <RemovePost postID={data.postID} />}
      </section>
      <div className="post-body">
        {data.postBody && <p className="post-text">{data.postBody}</p>}
        {data.postCover &&
          (isImg(data.postCover) ? (
            <Image
              height={320}
              width="100%"
              preview={false}
              className="post-cover"
              src={`${baseURL}${data.postCover}`}
            />
          ) : (
            <video width="100%" height={320} controls disablePictureInPicture>
              <source src={`${baseURL}${data.postCover}`} />
            </video>
          ))}
      </div>

      <div className="post-footer">
        <LikeButton postID={data.postID} likes={data.postLikes} />
        <span className="post-loves">{Object.keys(data.postLikes).length}</span>
      </div>
    </div>
  );
};

export default memo(Post);
