import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Delete from "@material-ui/icons/Delete";
import { Button, message, Tooltip } from "antd";
import { FavouriteContext } from "../../context/favourite/favourite-context";
import { removeFavouritesItem } from "../../context/favourite/favourite-cruds";
import "./DeleteButton.less";

const initState = {
  isLoading: false,
  error: null,
  success: null,
};
function DeleteButton({ itemID }) {
  const { dispatch } = React.useContext(FavouriteContext);
  const [status, setStatus] = React.useState(initState);
  const { pathname } = useLocation();

  const clickHandler = () => {
    let listType;
    switch (pathname) {
      case "/bookmarked":
        listType = "favourites";
        break;
      case "/recently":
        listType = "visitedBefore";
        break;
      default:
        listType = "";
        break;
    }

    removeFavouritesItem(listType, itemID, setStatus, dispatch);
  };

  useEffect(() => {
    if (status.success) {
      message.success(status.success);
    } else if (status.error) {
      message.error(status.error);
    }

    return () => {
      message.destroy();
    };
  }, [status.error, status.success]);

  return (
    <Tooltip
      placement="bottomLeft"
      arrowPointAtCenter={true}
      color="black"
      title="حذف"
    >
      <Button
        loading={status.isLoading}
        icon={<Delete />}
        shape="circle"
        onClick={clickHandler}
        className="removeitem-btn"
      />
    </Tooltip>
  );
}

export default DeleteButton;
