import { Typography } from "antd";
import { Link } from "react-router-dom";
import { ChevronLeft } from "@material-ui/icons";
import "./BoxHeader.less";

function BoxHeader({ title, titleLevel, isLink, linkPath }) {
  return (
    <section className="wrap-section-briefmovies__header">
      <Typography.Title level={titleLevel || 4} className="ff-almaria fw-8">
        {title}
      </Typography.Title>
      {isLink && linkPath && (
        <Link to={linkPath} className="more-link">
          للمزيد
          <ChevronLeft />
        </Link>
      )}
    </section>
  );
}

export default BoxHeader;
