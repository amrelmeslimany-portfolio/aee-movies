import React, { useState } from "react";
import { Typography } from "antd";
import { Star } from "@material-ui/icons";
import spinnerIMG from "../../assets/imgs/spinner.svg";
import imgErrorSrc from "../../assets/imgs/movie-error.png";

import MovieActions from "./MovieActions";
import "./MovieTrend.less";

const MovieImg = ({ data, isLazy }) => {
  const [imgError, setImgError] = useState(false);
  const imgsrc = data.movieImg || data.movieThumbnail;
  const classes = "movie-trending__overflow-img swiper-lazy";
  const onErrorHandler = (event) => {
    setImgError(true);
  };

  if (isLazy) {
    return (
      <img
        onError={onErrorHandler}
        data-src={imgError ? imgErrorSrc : imgsrc}
        src={imgError ? imgErrorSrc : spinnerIMG}
        className={classes}
        alt={data.movieTitle}
      />
    );
  }

  return (
    <img
      src={imgError ? imgErrorSrc : imgsrc}
      className={classes}
      alt={data.movieTitle}
      onError={onErrorHandler}
    />
  );
};

function MovieTrend({ data, topRate, noRate, isLazy, className }) {
  const footerClasses = ((topRate || noRate) && "no-qualityrating") || "";

  return (
    <div className={`movie-trending ${className ? className : ""}`}>
      <MovieImg data={data} isLazy={isLazy} />

      <div className="movie-trending__overflow" />

      {topRate && !noRate && (
        <small className="rating-badge">
          <Star /> {data.movieRating}
        </small>
      )}

      <Typography.Title
        className="ff-almaria fw-8 title"
        level={5}
        ellipsis={true}
      >
        {data.movieTitle}
      </Typography.Title>

      <div className={`movie-trending__footer ${footerClasses}`}>
        <section className="footer__info">
          <Typography.Text className="info__date">2022</Typography.Text>
          {!topRate && !noRate && (
            <div className="quality-rating">
              <span className="quality">
                {data.movieQuality ? data.movieQuality[0] : "***"}
              </span>
              <Typography.Text className="rating">
                {data.movieRating} التقييم
              </Typography.Text>
            </div>
          )}
        </section>
        <MovieActions link={`/details/${data._id}`} itemID={data._id} />
      </div>
    </div>
  );
}

export default MovieTrend;
