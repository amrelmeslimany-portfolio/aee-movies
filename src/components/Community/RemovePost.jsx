import React, { useContext, useState } from "react";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { Button, Popconfirm, Tooltip, message } from "antd";
import { CommunityContext } from "../../context/community/community-context";
import { removePost } from "../../context/community/community-cruds";
import "./RemovePost.less";

function RemovePost({ postID }) {
  const { dispatch } = useContext(CommunityContext);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(false);

  const openConfirmHandler = () => setConfirmToggle(true);

  const removePostHandler = () => {
    removePost(postID, setIsLoading, dispatch, message);
  };

  return (
    <Popconfirm
      onConfirm={removePostHandler}
      onCancel={() => setConfirmToggle(false)}
      okButtonProps={{ loading: isLoading }}
      title="هل انت متأكد من حذفه ؟"
      okText="متأكد"
      cancelText="إلغاء"
      open={confirmToggle}
      destroyTooltipOnHide
    >
      <Tooltip placement="right" color="black" title="حذف الخبر">
        <Button
          onClick={openConfirmHandler}
          shape="circle"
          className="post-deletebtn"
          icon={<DeleteOutlineOutlined />}
          type="text"
        />
      </Tooltip>
    </Popconfirm>
  );
}

export default RemovePost;
