import React, { forwardRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { AutoComplete, Button, Input, Typography } from "antd";
import { Search } from "@material-ui/icons";
import { getFilterdMovies } from "../../../../context/movies/movies-cruds";
import { MoviesContext } from "../../../../context/movies/movies-context";
import FilterItem from "./FilterItem";
import "./Filter.less";

const Filter = forwardRef((props, ref) => {
  const { dispatch, filteredItems, filterError, isFiltering } =
    useContext(MoviesContext);
  const { genres, setSelectedGenres } = props;
  const joiendGenres = genres.join(",");
  const [searchInput, setSearchInput] = useState("");
  const [searchClasses, setSearchClasses] = useState("");
  const navigate = useNavigate();

  const isFilteredItemCorrect = !isFiltering && !filterError;

  let options = isFilteredItemCorrect
    ? filteredItems.map((item) => ({
        key: item._id,
        label: (
          <FilterItem
            id={item._id}
            img={item.movieThumbnail}
            title={item.movieTitle}
          />
        ),
        value: item.movieTitle,
      }))
    : [];

  const searchHandler = debounce((value) => {
    getFilterdMovies(value, joiendGenres, dispatch);
    setSearchInput(value.trim());
  }, 400);

  const sumbitHandler = (e) => {
    if (!joiendGenres && !searchInput) return;
    const search = `${searchInput && "q=" + searchInput}${
      joiendGenres && "&countries=" + joiendGenres
    }`;
    navigate({
      pathname: "/search",
      search,
    });

    setSelectedGenres([]);
  };

  const noContent = filterError && (
    <article className="filter-nocontent">
      <Typography.Text>{filterError}</Typography.Text>
    </article>
  );

  useEffect(() => {
    let alertSearchButton;

    setSearchClasses("animation");

    alertSearchButton = setTimeout(() => {
      setSearchClasses("");
    }, 802);

    return () => {
      clearTimeout(alertSearchButton);
    };
  }, [genres]);

  return (
    <div className="filter-wrap" ref={ref}>
      <AutoComplete
        options={options}
        defaultActiveFirstOption={false}
        defaultOpen={false}
        popupClassName="popupfilter-wrap"
        onSearch={searchHandler}
        notFoundContent={noContent}
        allowClear={true}
      >
        <Input
          placeholder="إبحث..."
          prefix={
            <Button
              className={searchClasses}
              onClick={sumbitHandler}
              loading={isFiltering}
              icon={<Search />}
              shape={"circle"}
            />
          }
        />
      </AutoComplete>
    </div>
  );
});

export default React.memo(Filter);
