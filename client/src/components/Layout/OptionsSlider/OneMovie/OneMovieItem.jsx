import React from "react";
import BoxHeader from "../../../UI/BoxHeader";
import Loading from "../../../UI/Loading";
import Error from "../../../UI/Error";
import "./OneMovieItem.less";

function OneMovieItem({ component, title, path, state }) {
  const { isFetching, error, data } = state;

  const isInitGood = !isFetching && !error;
  return (
    <div className="onemovieitem-wraper">
      <BoxHeader
        title={title}
        linkPath={path}
        isLink={isInitGood && data.isMore}
      />
      {isFetching && <Loading />}
      {isInitGood && data.item.length > 0 && (
        <div className="slider-220w">
          {React.cloneElement(component, {
            ...component.props,
            data: data.item[0],
          })}
        </div>
      )}

      {isInitGood && data.item.length === 0 && (
        <Error message="القائمة فارغة" />
      )}

      {!isFetching && error && <Error message={error} />}
    </div>
  );
}

export default React.memo(OneMovieItem);
