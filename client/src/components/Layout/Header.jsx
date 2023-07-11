import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import PropsType from "prop-types";
import { Badge, Button, Layout, Space } from "antd";
import {
  ArrowBackIos,
  Close,
  Menu as MenuIcon,
  NotificationsOutlined,
} from "@material-ui/icons";
import "./Header.less";

const Links = ({ typeParam }) => {
  return (
    <Space size={25}>
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

export default function Header({ onCollapseSider, collapsed }) {
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
        <Badge dot offset={[10, 10]}>
          <Button
            icon={
              <NotificationsOutlined className="color-header icon-header" />
            }
            type={"text"}
          />
        </Badge>
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
