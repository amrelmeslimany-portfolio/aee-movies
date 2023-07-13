import React, { useContext } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Button, Typography } from "antd";
import { useEffect } from "react";
import { getCategoriedMovies } from "../context/movies/movies-cruds";
import { MoviesContext } from "../context/movies/movies-context";
import { useState } from "react";
import CategoriesList from "../components/Categories/CategoriesList";
import Error from "../components/UI/Error";
import Loading from "../components/UI/Loading";
import "./Category.less";
import { clearCategoriedMovies } from "../context/movies/moviesActions";

const titleWords = [
  {
    param: "top-watching",
    name: "الأكثر مشاهدة",
  },
  {
    param: "top-rating",
    name: "الأعلى تقييما",
  },
  {
    param: "english",
    name: "إنجليزية",
  },
];

function Category() {
  const { dispatch, categoriedItems } = useContext(MoviesContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [status, setStatus] = useState({ error: null, isFetching: false });
  const { error, isFetching } = status;
  const { category } = useParams();
  const [query] = useSearchParams();
  const type = query.get("type");
  const title = category && titleWords.find((item) => item.param === category);
  const categoriesLength = categoriedItems.items.length;
  const isMore =
    !error &&
    categoriesLength > 0 &&
    categoriesLength < 85 &&
    categoriedItems.isMore;

  const getMoreHandler = () => {
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(clearCategoriedMovies());
  }, [type, category, dispatch]);

  useEffect(() => {
    getCategoriedMovies(type, pageNumber, category, dispatch, setStatus);
  }, [type, category, pageNumber, dispatch]);

  return (
    <section className="category-wrap">
      <Typography.Title level={3} className="fw-8 ff-almaria category-title">
        {title && title.name}
      </Typography.Title>
      {!error && categoriesLength > 0 && (
        <CategoriesList items={categoriedItems.items} />
      )}
      {isFetching && categoriesLength === 0 && <Loading />}
      {isMore && (
        <div className="wrap-btn">
          <Button
            type="link"
            className="button-link"
            loading={isFetching}
            onClick={getMoreHandler}
          >
            ابعت كمان
          </Button>
        </div>
      )}
      {error && (
        <Error
          message={error}
          extra={<Link to={"/"} children="التصنيفات" className="button-link" />}
        />
      )}
    </section>
  );
}

export default Category;
