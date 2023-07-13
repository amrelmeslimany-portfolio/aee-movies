import React from "react";
import { Avatar, Typography } from "antd";
import Login from "../../User/Authentication/Login";
import CreateUser from "../../User/Authentication/CreateUser";
import { baseURL } from "../../../helpers";
import "./UserProfile.less";

function UserProfile({ isLogin, user }) {
  if (!isLogin) {
    return (
      <div className="optionsslider__profile-info">
        <Login />
        <CreateUser />
      </div>
    );
  }

  return (
    <div className="optionsslider__profile-info">
      <Avatar
        className="profile_avatar"
        size={50}
        src={`${baseURL}${user.profileImg}`}
      />
      <article className="profile_info">
        <Typography.Title
          level={5}
          ellipsis={true}
          className="profile_username"
        >
          {user.name}
        </Typography.Title>
        <Typography.Text ellipsis={true} className="profile_email">
          {user.email}
        </Typography.Text>
      </article>
    </div>
  );
}

export default React.memo(UserProfile);
