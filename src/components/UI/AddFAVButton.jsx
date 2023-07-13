import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth/auth-context";
import { Add, Star } from "@material-ui/icons";
import { Button, message, Tag, Tooltip } from "antd";
import GuardMessage from "../UI/GuardMessage";
import { addToFavourite } from "../../context/favourite/favourite-cruds";
import { FavouriteContext } from "../../context/favourite/favourite-context";
import "./AddFAVButton.less";

const initalStatus = {
  isLoading: false,
  error: null,
};

function AddFAVButton({ itemID }) {
  const { isLogin } = useContext(AuthContext);
  const { favourites, dispatch } = useContext(FavouriteContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [{ error, isLoading }, setStatus] = useState(initalStatus);
  const [isSubmit, setIsSubmit] = useState(false);

  const isAlertNow = isSubmit && !isLoading;
  const isFav = isLogin && favourites?.includes(itemID);
  const tooltipTitle = isFav ? "موجود في المفضلة" : `اضف الي المفضلة`;

  const closeModalHandler = () => setToggleModal(false);
  const clickHandler = () => {
    if (!isLogin) {
      setToggleModal(true);
    } else {
      addToFavourite(itemID, setStatus, dispatch);
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    isLogin && setToggleModal(false);
  }, [isLogin]);

  useEffect(() => {
    if (isAlertNow && !error)
      message.success({ key: "fav", content: "تم اضافة الي المفضلة" });
    else if (isAlertNow && error) message.error({ key: "fav", content: error });

    setTimeout(() => setIsSubmit(false), 3000);

    return () => {
      message.destroy("fav");
    };
  }, [isAlertNow, error]);

  return (
    <>
      <Tooltip
        title={tooltipTitle}
        placement="bottomLeft"
        arrowPointAtCenter={true}
        color="black"
      >
        {isFav ? (
          <Tag icon={<Star />} className="favourite-tag" />
        ) : (
          <Button
            loading={isLoading}
            icon={<Add />}
            shape={"circle"}
            onClick={clickHandler}
            className="addfavorite-btn"
          />
        )}
      </Tooltip>

      {!isLogin && (
        <GuardMessage onClose={closeModalHandler} toggleModal={toggleModal} />
      )}
    </>
  );
}

export default AddFAVButton;
