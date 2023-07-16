import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import PropsType from "prop-types";
import { Button, Layout, Space, Grid } from "antd";
import {
  ArrowBackIos,
  Close,
  Menu as MenuIcon,
  Search,
} from "@material-ui/icons";
import "./Header.less";

const { useBreakpoint } = Grid;

const Links = ({ typeParam }) => {
  const { md } = useBreakpoint();

  return (
    <Space className={`navbar-links ${!md ? "scrollable" : ""}`} size={25}>
      <Link
        to={{ pathname: "/", search: "type=movies" }}
        className={`color-header ${typeParam === "movies" ? "active" : ""}`}
      >
        الأفلام
      </Link>
      <Link
        to={{ pathname: "/", search: "type=series" }}
        className={`color-header ${typeParam === "series" ? "active" : ""}`}
      >
        المسلسلات
      </Link>
      <Link
        to={{ pathname: "/", search: "type=tvshows" }}
        className={`color-header ${typeParam === "tvshows" ? "active" : ""}`}
      >
        العروض
      </Link>
    </Space>
  );
};

export default function Header({
  onCollapseSider,
  collapsed,
  onOptionSliderChange,
}) {
  const [isHome, setIsHome] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const typeParam = params.get("type") || "";

  const backHandler = () => navigate(-1);

  useEffect(() => {
    location.pathname === "/" ? setIsHome(true) : setIsHome(false);
  }, [location]);

  return (
    <Layout.Header>
      <Space size={25}>
        <Button
          onClick={onCollapseSider}
          icon={
            collapsed ? (
              <Close className="color-header icon-header" />
            ) : (
              <MenuIcon className="color-header icon-header" />
            )
          }
          type={"text"}
        />

        <Button
          onClick={onOptionSliderChange}
          icon={<Search className="color-header icon-header" />}
          type={"text"}
        />
      </Space>
      {isHome ? (
        <Links typeParam={typeParam} />
      ) : (
        <Button
          className="back-button"
          onClick={backHandler}
          icon={<ArrowBackIos />}
          shape={"circle"}
        />
      )}
    </Layout.Header>
  );
}

Header.propTypes = {
  onCollapseSider: PropsType.func,
  collapsed: PropsType.bool,
};
