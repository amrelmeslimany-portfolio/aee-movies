import Error from "./Error";
import Login from "../User/Authentication/Login";
import CreateUser from "../User/Authentication/CreateUser";
import { Modal } from "antd";

function GuardMessage({ onClose, toggleModal, message }) {
  const text = message || "لازم تسجل دخولك الاول علشان تشوف محتوي الصفحة دي.";

  return (
    <Modal
      afterClose={onClose}
      open={toggleModal}
      destroyOnClose={true}
      onCancel={onClose}
      footer={null}
    >
      <Error
        message={text}
        extra={
          <>
            <Login />
            <CreateUser />
          </>
        }
      />
    </Modal>
  );
}

export default GuardMessage;
