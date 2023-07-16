import React, { useEffect, useRef, useState, useContext } from "react";
import { Button, Grid, Layout } from "antd";
import UserProfile from "./UserProfile";
import Filter from "./Filter/Filter";
import TagsFilter from "./TagsFilter";
import { AuthContext } from "../../../context/auth/auth-context";
import OneMovieList from "./OneMovie/OneMovieList";
import { Close } from "@material-ui/icons";
import "./OptionsSlider.less";
const { useBreakpoint } = Grid;
function OptionsSlider(props) {
  const { md } = useBreakpoint();
  const { isLogin, user } = useContext(AuthContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const searchInput = useRef(null);

  useEffect(() => {
    selectedGenres.length === 1 &&
      searchInput.current.scrollIntoView({ behavior: "smooth" });
  }, [selectedGenres]);

  return (
    <Layout.Sider
      className={`optionsslider ${!props.optionSlider ? "hide" : ""}`}
    >
      {!md && (
        <div className="padding">
          <Button shape="circle" type="primary" onClick={props.onCloseSlider}>
            <Close />
          </Button>
        </div>
      )}
      <UserProfile user={user} isLogin={isLogin} />
      <Filter
        genres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        ref={searchInput}
      />
      <TagsFilter
        setSelectedGenres={setSelectedGenres}
        selectedGenres={selectedGenres}
      />
      {isLogin && <OneMovieList user={user} />}
    </Layout.Sider>
  );
}

export default OptionsSlider;
