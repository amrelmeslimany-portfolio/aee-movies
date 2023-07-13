import React from "react";
import PropTypes from "prop-types";
import Slider from "./Slider";
import Error from "./Error";
import Loading from "./Loading";
import { handleTitle } from "../../helpers";
import BoxHeader from "./BoxHeader";
import "./Tape.less";

function Tape({ title, moreLink, data, componentItem, isFetching }) {
  const isCorrect = !isFetching && data && data?.length !== 0;
  const slideWidth = componentItem.props.slideWidth;
  const tapeClasses = slideWidth ? `slider-${slideWidth}w` : "";
  return (
    <div className={`wrap-section-briefmovies ${tapeClasses}`}>
      <BoxHeader title={title} isLink={isCorrect} linkPath={moreLink} />
      {isCorrect && (
        <Slider
          item={componentItem}
          data={handleTitle(data)}
          lazy={{
            loadPrevNext: true,
            loadPrevNextAmount: 1,
          }}
          watchSlidesVisibility={true}
        />
      )}

      {isFetching && <Loading />}
      {data?.length === 0 && <Error message={"غير متوفر أفلام الأن"} />}
    </div>
  );
}

Tape.propTypes = {
  title: PropTypes.string,
  moreLink: PropTypes.string,
  data: PropTypes.array,
  className: PropTypes.string,
  isFetching: PropTypes.bool,
};

export default Tape;
