import { Avatar, Image, Tag, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  AccessTime,
  EditOutlined,
  EmailOutlined,
  Star,
} from "@material-ui/icons";
import coverImg from "../../assets/imgs/profile-cover.webp";

import { baseURL, handleZeroPrefix } from "../../helpers";
import "./ProfileHeader.less";

function ListTag(props) {
  if (props.isMyProfile === "hide") return;

  const content = (
    <>
      {props.icon}
      <span className="number">
        {props.number === 0 ? "فارغه" : handleZeroPrefix(props.number)}
      </span>
    </>
  );

  return (
    <Tooltip title={props.title} color="black" placement="right">
      {props.isMyProfile ? (
        <Link to={props.to} className="userlist-item">
          {content}
        </Link>
      ) : (
        <div className="userlist-item">{content}</div>
      )}
    </Tooltip>
  );
}

function ProfileHeader({ user, isMyProfile }) {
  const { visitedLength, favLength, email, name, bio, profileImg } = user;
  return (
    <div className="profile-header">
      <Image
        src={coverImg}
        preview={false}
        height={300}
        width="100%"
        className="profile-cover"
      />
      <section className="profile-user-brief" size={20}>
        <div className="user-img-profile">
          <Avatar size={200} src={`${baseURL}${profileImg}`} />
        </div>

        <article className="profile-userinfo">
          <Typography.Title level={3} className="fw-8 fw-almaria username">
            {name}
          </Typography.Title>
          <Tag
            icon={<EmailOutlined fontSize="medium" />}
            className="user-email"
          >
            {!isMyProfile ? "*".repeat(email.length - 1) + email[0] : email}
          </Tag>
          <Tag className="user-biotext">{bio || "نبذه مختصرة عنك"}</Tag>
        </article>

        <div className="profileUserLists-counter">
          <ListTag
            to="/profile/edit"
            title="تعديل الملف الشخصي"
            icon={<EditOutlined className="icon edit" />}
            number="تعديل"
            isMyProfile={isMyProfile ? true : "hide"}
          />
          <ListTag
            to="/bookmarked"
            title="قائمتك المفضله"
            icon={<Star className="icon favourite" />}
            number={favLength}
            isMyProfile={isMyProfile}
          />
          <ListTag
            isMyProfile={isMyProfile}
            to="/recently"
            title="قائمة ما زورته من قبل"
            icon={<AccessTime className="icon recently" />}
            number={visitedLength}
          />
        </div>
      </section>
      <div className="profile-data-sidebar"></div>
    </div>
  );
}

export default ProfileHeader;
