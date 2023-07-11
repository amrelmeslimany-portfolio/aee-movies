import { Button, message, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  getList,
  removeFavouritesAll,
} from "../context/favourite/favourite-cruds";
import GridList from "../components/UI/GridList";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";
import { useContext } from "react";
import { FavouriteContext } from "../context/favourite/favourite-context";
import Delete from "@material-ui/icons/Delete";
import "./ListSettings.less";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  successMessage: "",
};

function ListSettings({ type: listType }) {
  const { visitedBefore, favourites, dispatch } = useContext(FavouriteContext);
  const [status, setStatus] = useState(initialState);

  const pageTitle =
    listType === "favourites" ? "قائمتك المفضلة" : "قائمة الافلام التي زورتها";

  const removeAllBTNHandler = () => {
    removeFavouritesAll(listType, setStatus, dispatch);
  };

  useEffect(() => {
    if (favourites.length === 0 && visitedBefore.length === 0) {
      const errorMessage =
        listType === "favourites"
          ? "ليس لديك افلام فى المفضلة"
          : "لم تقم بزيارة افلام";
      setStatus((prev) => ({
        ...prev,
        error: errorMessage,
        items: [],
      }));
    } else getList(listType, setStatus);
  }, [favourites, visitedBefore, listType]);

  useEffect(() => {
    if (status.successMessage) {
      message.success(status.successMessage);
    }

    return () => {
      message.destroy();
    };
  }, [status.successMessage]);

  return (
    <div className="listsettings-page">
      <section className="header">
        <Typography.Title
          level={3}
          className="listsettings-title fw-8 ff-almaria"
        >
          {pageTitle}
        </Typography.Title>
        {!status.isLoading && status.items.length ? (
          <Tooltip
            placement="bottomLeft"
            arrowPointAtCenter={true}
            color="black"
            title="حذف القائمة بالكامل"
          >
            <Button
              onClick={removeAllBTNHandler}
              icon={<Delete />}
              size="middle"
              type="primary"
              shape="round"
              className="removeall-btn"
            >
              الكل
            </Button>
          </Tooltip>
        ) : null}
      </section>

      {status.isLoading && <Loading />}

      {status.error && <Error message={status.error} />}
      {!status.isLoading && status.items && (
        <GridList removeble={true} list={status.items} />
      )}
    </div>
  );
}

export default ListSettings;
