import React, { useEffect, useState } from "react";
import { List, Tag, Typography } from "antd";
import CheckableTag from "antd/lib/tag/CheckableTag";
import { Add, Check } from "@material-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { getGenresMoves } from "../../../context/movies/movies-cruds";
import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

import "swiper/swiper.less";
import "./TagsFilter.less";

function TagsFilter({ setSelectedGenres, selectedGenres }) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isGenresCorrect = !loading && !error;

  const tagChangedHandler = (value) => {
    setSelectedGenres((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }

      return [...prev, value];
    });
  };

  useEffect(() => {
    getGenresMoves(setGenres, setLoading, setError);
  }, []);

  const genreItem = (item) => (
    <List.Item className="genre_item">
      <CheckableTag
        onChange={() => tagChangedHandler(item.title)}
        className="genre_tag"
        checked={selectedGenres.includes(item.title)}
      >
        <Typography.Text ellipsis={"rows"}>{item.title}</Typography.Text>
        {selectedGenres.includes(item.title) ? <Check /> : <Add />}
      </CheckableTag>
    </List.Item>
  );

  const slides =
    isGenresCorrect &&
    genres.map((item) => (
      <SwiperSlide key={item._id}>
        <List
          bordered={false}
          dataSource={item.genres.map((genre) => ({
            title: genre,
          }))}
          className="genre_list"
          itemLayout="horizontal"
          renderItem={genreItem}
        />
      </SwiperSlide>
    ));

  return (
    <section className="options_tag_wrap">
      <div className="options_header">
        <Typography.Title level={5} className="options__title">
          البلد
        </Typography.Title>

        <Tag className="genresselected_number" color="black">
          {selectedGenres.length}
        </Tag>
      </div>
      {isGenresCorrect && (
        <Swiper slidesPerView={"auto"} dir="rtl" spaceBetween={5}>
          {slides}
        </Swiper>
      )}
      {loading && <Loading />}
      {error && <Error message={error} />}
    </section>
  );
}

export default TagsFilter;
