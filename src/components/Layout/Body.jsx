import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Home from "../../pages/Home";
import Category from "../../pages/Category";
import SearchResult from "../../pages/SearchResult";
import Details from "../../pages/Details";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/auth-context";
import ListSettings from "../../pages/ListSettings";
import Profile from "../../pages/Profile";
import Community from "../../pages/Community";
import Error from "../UI/Error";
import Login from "../User/Authentication/Login";
import CreateUser from "../User/Authentication/CreateUser";
import "./Body.less";
import MyProfile from "../Profile/MyProfile";
import UserProfile from "../Profile/UserProfile";
import EditProfile from "../Profile/EditProfile";
import { Page404 } from "../../pages/404";

function Body() {
  const { isLogin, user } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const guard = (
    <Error
      message="علشان تشوف محتوي الصفحة لازم تسجل دخولك"
      extra={
        <>
          <Login />
          <CreateUser />
        </>
      }
    />
  );
  return (
    <Layout.Content className="body-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />}>
          <Route
            path="me"
            element={isLogin ? <MyProfile user={user} myprofile /> : guard}
          />
          <Route
            path="edit"
            element={isLogin ? <EditProfile user={user} myprofile /> : guard}
          />
          <Route path=":userid" element={<UserProfile />} />
        </Route>

        {/* Must Authentication */}
        <Route
          path="/bookmarked"
          element={
            isLogin ? (
              <ListSettings type="favourites" docTitle="المفضلة" />
            ) : (
              guard
            )
          }
        />
        <Route
          path="/recently"
          element={
            isLogin ? (
              <ListSettings
                type="visitedBefore"
                docTitle="الافلام التي زورتها"
              />
            ) : (
              guard
            )
          }
        />

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Layout.Content>
  );
}

export default Body;
