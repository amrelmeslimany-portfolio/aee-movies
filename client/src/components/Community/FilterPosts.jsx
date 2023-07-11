import { Checkbox, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import "./FilterPosts.less";

const filterOptions = [
  {
    label: "الأكثر اعجابا",
    value: "likest",
  },
  {
    label: "الأقدم",
    value: "oldest",
  },
];

export const FilterPosts = ({ onFilterChange, doRequest }) => {
  const [searchParams, setFilter] = useSearchParams();
  const defaultFilters = searchParams.get("filters")
    ? searchParams.get("filters").split(",")
    : [];

  const filterPostsHandler = (value) => {
    if (!doRequest) return;
    if (value.length === 0) {
      setFilter({});
      return;
    }
    onFilterChange();
    setFilter({
      filters: value.join(","),
    });
  };

  return (
    <div className="wrap-newsfilter">
      <Typography.Title level={5} className="ff-almaria fw-8 title">
        فلتر
      </Typography.Title>
      <Checkbox.Group
        disabled={!doRequest}
        options={filterOptions}
        defaultValue={defaultFilters}
        onChange={filterPostsHandler}
      />
    </div>
  );
};
