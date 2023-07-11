import { useCallback } from "react";
import { Modal } from "antd";
import "./successedmodal.less";

function useSuccessedModal() {
  return useCallback((status) => {
    if (status) {
      let modal = Modal.success({
        content: status,
        okButtonProps: { className: "okbtn-style" },
        direction: "rtl",
        okText: "تمام",
      });

      setTimeout(() => modal.destroy(), 5000);
    }
  }, []);
}

export default useSuccessedModal;
