import React, { useEffect, useContext } from "react";
import { Typography } from "antd";
import { useSearchParams } from "react-router-dom";

import Error from "../components/UI/Error";
import { MoviesContext } from "../context/movies/movies-context";
import { getFilterdMovies } from "../context/movies/movies-cruds";
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import Loading from "../components/UI/Loading";
import "./SearchResult.less";
import GridList from "../components/UI/GridList";
import useDocTitle from "../hooks/useDocTitle";

function SearchResult() {
  const { dispatch, filteredItems, filterError, isFiltering } =
    useContext(MoviesContext);
  const areItems = !isFiltering && filteredItems?.length !== 0;
  const [queries] = useSearchParams();
  const titleQuery = queries.get("q");
  const countryQuery = queries.get("countries");

  useDocTitle("نتائج البحث");

  useEffect(() => {
    getFilterdMovies(titleQuery, countryQuery, dispatch);
  }, [titleQuery, countryQuery, dispatch]);

  return (
    <section className="search-result">
      <article className="search-header">
        <Typography.Title level={3} className="fw-8 ff-almaria ">
          نتائج البحث
        </Typography.Title>
        <div className="search-info">
          <span>
            {titleQuery ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
            اسم الفيلم
          </span>
          <span>
            {countryQuery ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
            دولة الفيلم
          </span>
        </div>
      </article>
      {isFiltering && <Loading />}
      {areItems && <GridList list={filteredItems} />}
      {filterError && <Error message={filterError} />}
    </section>
  );
}

export default SearchResult;
