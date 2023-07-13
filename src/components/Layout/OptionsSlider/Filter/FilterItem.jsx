import { Image, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import imageError from "../../../../assets/imgs/movie-error.png";

const FilterItem = ({ id, img, title }) => {
  const [isImgError, setIsImgError] = useState(false);

  return (
    <Link key={id} className="filter-select-item" to={`/details/${id}`}>
      <Image
        alt={title}
        src={!isImgError ? img : imageError}
        width={45}
        height={45}
        preview={false}
        onError={() => setIsImgError(true)}
      />
      <Typography.Text ellipsis={true}>{title}</Typography.Text>
    </Link>
  );
};

export default FilterItem;
