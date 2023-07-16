import { useState, useContext, useEffect } from "react";
import { Add, AddAPhoto } from "@material-ui/icons";
import {
  Button,
  Form,
  message,
  Modal,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { CommunityContext } from "../../context/community/community-context";
import { AuthContext } from "../../context/auth/auth-context";
import TextArea from "antd/lib/input/TextArea";
import FormItem, { FormSubmit } from "../UI/FormItem";
import { addPost } from "../../context/community/community-cruds";
import GuardMessage from "../UI/GuardMessage";
import "./AddPost.less";
import { filterTags } from "../../helpers";

const initStatus = {
  error: null,
  isLoading: false,
  isSuccess: false,
};

function AddPost() {
  const { isLogin } = useContext(AuthContext);
  const { dispatch } = useContext(CommunityContext);
  const [status, setStatus] = useState(initStatus);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleGuard, setToggleGuard] = useState(false);

  const addPostBtnHandler = () => {
    setToggleGuard(false);
    setToggleModal(false);
    if (isLogin) setToggleModal(true);
    else setToggleGuard(true);
  };

  const closeGuardHandler = () => setToggleGuard(false);

  const submitHandler = (post) => {
    addPost(post, setStatus, dispatch);
  };

  useEffect(() => {
    if (status.error) message.error({ content: status.error });
    else if (status.isSuccess) {
      message.success("تم اضافة الخبر بنجاح");
      setToggleModal(false);
    }

    return () => {
      message.destroy();
    };
  }, [status.error, status.isSuccess]);

  return (
    <div className="addpost-wrap">
      <div className="addpost-button">
        <Tooltip
          color="black"
          placement="top"
          title="اضغط هنا لو عايز تضيف خبر جديد"
        >
          <Button
            icon={<Add />}
            onClick={addPostBtnHandler}
            shape={"circle"}
            type="primary"
            size="large"
          />
        </Tooltip>
      </div>
      {isLogin && (
        <Modal
          confirmLoading={status.isLoading}
          open={toggleModal}
          destroyOnClose={true}
          onCancel={() => setToggleModal(false)}
          afterClose={() => setToggleModal(false)}
          title={
            <Typography.Title level={4} className="ff-almaria fw-8 modal-title">
              اضافة خبر
            </Typography.Title>
          }
          footer={null}
        >
          <AddPostForm onSubmit={submitHandler} isLoading={status.isLoading} />
        </Modal>
      )}

      {!isLogin && (
        <GuardMessage
          onClose={closeGuardHandler}
          toggleModal={toggleGuard}
          message="يجب تسجيل الدخول لتستطيع اضافة خبر جديد"
        />
      )}
    </div>
  );
}

const AddPostForm = ({ onSubmit, isLoading }) => {
  const [postImageList, setPostImageList] = useState([]);
  const beforeUploadHandler = (file) => {
    setPostImageList([file]);
    return false;
  };

  const submitHandler = ({ body = "" }) => {
    const dataForm = new FormData();
    if (postImageList.length === 0 && body?.trim().length === 0) {
      message.warning({
        content: "يجب ان تدخل صورة او محتوى",
        onClose: () => message.destroy(),
      });
      return;
    }

    if (postImageList.length > 0) dataForm.append("postIMG", postImageList[0]);
    if (body?.trim().length > 0)
      dataForm.append(
        "postBody",
        filterTags(body).trim().replace(/\n/g, "<br>")
      );

    onSubmit(dataForm);
  };

  return (
    <Form className="addpost-formself" onFinish={submitHandler}>
      <div className="upload-wrap">
        <Upload.Dragger
          listType="picture"
          multiple={false}
          maxCount={1}
          accept="image/* , video/*"
          beforeUpload={beforeUploadHandler}
          onRemove={() => setPostImageList([])}
          disabled={isLoading}
        >
          <>
            <AddAPhoto fontSize="large" />
            <p>
              {" "}
              قم <strong>بسحب</strong> او <strong>رفع</strong> صورة الخبر
            </p>
          </>
        </Upload.Dragger>
      </div>

      <FormItem
        input={
          <TextArea
            disabled={isLoading}
            className="small-radius withscrollbar"
            autoSize={{ minRows: 2 }}
          />
        }
        placeholder="محتوى الخبر"
        name="body"
      />
      <FormSubmit text="اضافة" isLoading={isLoading} />
    </Form>
  );
};

export default AddPost;
