import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { FavouriteContext } from "../../../../context/favourite/favourite-context";

import { getOneMovie } from "../../../../context/movies/movies-cruds";
import MovieTrend from "../../../Movies/MovieTrend";

import OneMovieItem from "./OneMovieItem";
import "./OneMovieList.less";

const initialData = {
  visitedBefore: { isMore: false, item: [] },
  favourite: { isMore: false, item: [] },
};

function OneMovieList() {
  const [result, setResult] = useState({
    data: initialData,
    isFetching: false,
    error: null,
  });

  const { favourites, visitedBefore } = useContext(FavouriteContext);

  useEffect(() => {
    if (favourites.length === 0 && visitedBefore.length === 0) {
      setResult((prev) => ({ ...prev, data: initialData }));
    } else {
      getOneMovie(setResult, initialData);
    }
  }, [favourites, visitedBefore]);

  return (
    <div className="wrap-one-movie-inslider">
      <OneMovieItem
        component={<MovieTrend slideWidth={220} noRate={true} />}
        path="/recently"
        title="أفلام زورتها"
        state={{
          ...result,
          data: result.data.visitedBefore,
        }}
      />
      <OneMovieItem
        component={<MovieTrend slideWidth={220} topRate={true} />}
        path="/bookmarked"
        title="المفضلة"
        state={{
          ...result,
          data: result.data.favourite,
        }}
      />
    </div>
  );
}

export default OneMovieList;
