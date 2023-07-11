import React, { useEffect, useRef, useState, useContext } from "react";
import { Layout } from "antd";

import UserProfile from "./UserProfile";
import Filter from "./Filter/Filter";
import TagsFilter from "./TagsFilter";

import { AuthContext } from "../../../context/auth/auth-context";
import OneMovieList from "./OneMovie/OneMovieList";
import "./OptionsSlider.less";

function OptionsSlider(props) {
  const { isLogin, user } = useContext(AuthContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    selectedGenres.length === 1 &&
      searchInput.current.scrollIntoView({ behavior: "smooth" });
  }, [selectedGenres]);

  return (
    <Layout.Sider className="optionsslider">
      <UserProfile user={user} isLogin={isLogin} />
      <Filter genres={selectedGenres} ref={searchInput} />
      <TagsFilter
        setSelectedGenres={setSelectedGenres}
        selectedGenres={selectedGenres}
      />
      {isLogin && <OneMovieList user={user} />}
    </Layout.Sider>
  );
}

export default OptionsSlider;
