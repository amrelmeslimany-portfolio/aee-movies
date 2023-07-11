import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/auth/auth-context";
import { Divider, Layout, Menu, Typography } from "antd";
import {
  HomeOutlined,
  GroupOutlined,
  Home,
  Group,
  Bookmark,
  BookmarkBorderOutlined,
  AccessTimeOutlined,
  AccessTimeTwoTone,
  Person,
  PersonOutline,
  NoMeetingRoom,
  NoMeetingRoomOutlined,
} from "@material-ui/icons";

import { logoutAPI } from "../../context/auth/auth-cruds";
import "./MenuSider.less";

const pagesLinks = (pathname) => [
  {
    label: <Link to={"/?type=movies"}>الرئسية</Link>,
    key: "/",
    icon:
      pathname === "/" ? (
        <Home className="menu__icon" />
      ) : (
        <HomeOutlined className="menu__icon" />
      ),
  },
  {
    label: <Link to={"/community"}>المجتمع</Link>,
    key: "/community",
    icon:
      pathname === "/community" ? (
        <Group className="menu__icon" />
      ) : (
        <GroupOutlined className="menu__icon" />
      ),
  },
];
const libraryLinks = (pathname) => [
  {
    label: (
      <Link to={"/bookmarked"} className="taginlink">
        المفضلة
      </Link>
    ),
    key: "/bookmarked",
    icon:
      pathname === "/bookmarked" ? (
        <Bookmark className="menu__icon" />
      ) : (
        <BookmarkBorderOutlined className="menu__icon" />
      ),
  },
  {
    label: <Link to={"/recently"}> الأفلام التي زورتها !</Link>,
    key: "/recently",
    icon:
      pathname === "/recently" ? (
        <AccessTimeTwoTone className="menu__icon" />
      ) : (
        <AccessTimeOutlined className="menu__icon" />
      ),
  },
];
const settingLinks = (pathname, logoutHandler) => [
  {
    label: <Link to={"/profile/me"}>البروفايل</Link>,
    key: "/profile",
    icon:
      pathname === "/profile" ? (
        <Person className="menu__icon" />
      ) : (
        <PersonOutline className="menu__icon" />
      ),
  },
  {
    label: (
      <a
        href="/"
        type="text"
        className="logout-btn"
        onClick={(e) => logoutHandler(e)}
      >
        تسجيل الخروج
      </a>
    ),
    key: "/logout",
    icon:
      pathname === "/logout" ? (
        <NoMeetingRoom className="menu__icon" />
      ) : (
        <NoMeetingRoomOutlined className="menu__icon" />
      ),
  },
];

export default function MenuSider({ collapsed }) {
  const { isLogin, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  const logoutHandler = (e) => {
    e.preventDefault();
    logoutAPI(dispatch);
  };

  useEffect(() => {
    if (location && currentPage !== location.pathname) {
      setCurrentPage(location.pathname);
    }
  }, [location, currentPage]);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="menu__sider"
    >
      <Typography.Title level={5} className="menu__title">
        الصفحات
      </Typography.Title>
      <Menu
        theme="dark"
        items={pagesLinks(location.pathname)}
        selectedKeys={[currentPage]}
      />
      <Divider />
      <Typography.Title level={5} className="menu__title">
        المكتبات
      </Typography.Title>
      <Menu
        theme="dark"
        items={libraryLinks(location.pathname)}
        selectedKeys={[currentPage]}
      />
      {isLogin && (
        <>
          <Divider />
          <Typography.Title level={5} className="menu__title">
            الإعدادات
          </Typography.Title>
          <Menu
            theme="dark"
            items={settingLinks(location.pathname, logoutHandler)}
            selectedKeys={[currentPage]}
          />
        </>
      )}
    </Layout.Sider>
  );
}

MenuSider.prototypes = {
  collapsed: PropTypes.bool,
};
