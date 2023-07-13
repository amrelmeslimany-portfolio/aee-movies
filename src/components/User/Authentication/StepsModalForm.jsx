import { Button, Divider, Form, message, Modal, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/auth-context";
import { createNewUser, loginApi } from "../../../context/auth/auth-cruds";
import { FormSubmit } from "../../UI/FormItem";
import "./StepsModalForm.less";

const initStatus = { isLoading: false, error: null };

function StepsModalForm({ text, isLoginForm, successMessage, children }) {
  const { dispatch, isLogin } = useContext(AuthContext);
  const [status, setStatus] = useState(initStatus);
  const [toggleModal, setToggleModal] = useState(false);
  const openModalHandler = () => {
    setToggleModal(true);
  };
  const toggleBTNClasses = `toggleformmodal-btn ${
    isLoginForm ? "login-button" : "createuser-button"
  }`;

  const closeModalHandler = () => {
    setToggleModal(false);
    message.destroy("error");
    setStatus(initStatus);
  };

  const submitFaildedHandler = () =>
    setStatus((prev) => ({ ...prev, error: null }));

  const submitHandler = (user) => {
    if (isLoginForm) {
      loginApi(user, setStatus, dispatch);
    } else {
      createNewUser(user, setStatus, dispatch);
    }
  };

  useEffect(() => {
    isLogin && setToggleModal(false);
  }, [isLogin]);

  useEffect(() => {
    status.error
      ? message.error({ duration: null, content: status.error, key: "error" })
      : message.destroy("error");
    return () => {
      message.destroy("error");
    };
  }, [status.error]);

  return (
    <>
      <Button
        shape="round"
        onClick={openModalHandler}
        className={toggleBTNClasses}
      >
        {text}
      </Button>
      {!isLogin && (
        <Modal
          open={toggleModal}
          confirmLoading={status.isLoading}
          destroyOnClose={true}
          onCancel={closeModalHandler}
          afterClose={closeModalHandler}
          title={
            <Typography.Title level={4} className="ff-almaria fw-8 modal-title">
              {text}
            </Typography.Title>
          }
          footer={null}
        >
          <Form
            onFinishFailed={submitFaildedHandler}
            autoComplete="off"
            onFinish={submitHandler}
            name="create-user"
          >
            {children}
            <Divider />
            <FormSubmit
              text={text.split(" ")[0]}
              isLoading={status.isLoading}
            />
          </Form>
        </Modal>
      )}
    </>
  );
}

export default StepsModalForm;
