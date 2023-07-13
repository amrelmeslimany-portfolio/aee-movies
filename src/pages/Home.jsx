import React, { useEffect } from "react";
import Tape from "../components/UI/Tape";
import MovieTrend from "../components/Movies/MovieTrend";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getMoviesGenre } from "../context/movies/movies-cruds";
import { useContext } from "react";
import { MoviesContext } from "../context/movies/movies-context";
import Error from "../components/UI/Error";
import useDocTitle from "../hooks/useDocTitle";

function Home(props) {
  const { dispatch, items, isFetching, error } = useContext(MoviesContext);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const movieType = (params && params.get("type")) || "";

  useDocTitle("الصفحة الرئيسية");

  useEffect(() => {
    if (params && params.get("type")) getMoviesGenre(movieType, dispatch);
    else navigate({ search: "type=movies" });
  }, [movieType, navigate, params, dispatch]);

  if (error) {
    if (error.response.status === 400)
      return <Error message={error.response.data} />;
    else return <Error message={"معلش في مشكله حصلت , بس متقلقش مش من عندك"} />;
  }

  return (
    <React.Fragment>
      <Tape
        componentItem={<MovieTrend slideWidth={400} />}
        data={items.topWatchs}
        moreLink={`/category/top-watching?type=${movieType}`}
        title={"الأكثر مشاهدة"}
        isFetching={isFetching}
      />
      <Tape
        componentItem={<MovieTrend topRate={true} slideWidth={220} />}
        data={items.topRating}
        moreLink={`/category/top-rating?type=${movieType}`}
        title={"الأعلى تقييما"}
        isFetching={isFetching}
      />
      <Tape
        componentItem={<MovieTrend noRate={true} slideWidth={220} />}
        data={items.newMovies}
        moreLink={`/category/english?type=${movieType}`}
        title={"أفلام إنجليزية"}
        isFetching={isFetching}
      />
    </React.Fragment>
  );
}

Home.propTypes = {};

export default Home;
