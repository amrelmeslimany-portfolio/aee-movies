import React, { useState } from "react";
import { Image, Tag, Typography } from "antd";
import MovieActions from "./MovieActions";
import movieErrorImg from "../../assets/imgs/movie-error.png";

import "./SearchedMovie.less";
function SearchedMovie({ data, removeble }) {
  const { movieTitle, movieCountry, movieThumbnail, movieRating, _id } = data;
  const [isImgError, setIsImgError] = useState(false);

  return (
    <div className="movie-search-result">
      <Image
        width={100}
        height={150}
        onError={() => setIsImgError(true)}
        preview={false}
        src={isImgError ? movieErrorImg : movieThumbnail}
      />
      <div className="movie-info">
        <article>
          <Typography.Title level={4} className="ff-almaria moviename">
            {movieTitle}
          </Typography.Title>
          <Tag color="#543864">{movieCountry}</Tag>
        </article>

        <MovieActions
          link={`/details/${_id}`}
          className="flex not-right space-between"
          removeble={removeble}
          itemID={_id}
        />
      </div>

      <div className="rating">
        <strong className="number">{movieRating}</strong>
        <Typography.Text>التقييم</Typography.Text>
      </div>
    </div>
  );
}

export default SearchedMovie;
