import React, { useState } from "react";
import { Modal, Button } from "antd";

const ReportModal = ({ visible, onClose, data }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    // You can perform any actions here if needed
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      onClose();
    }, 1000);
    };
    console.log(data);

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Information"
      open={true}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
          <p>Intent: {data?.intent}</p>
          <p>Reason: {data?.reason }</p>

    </Modal>
  );
};

export default ReportModal;
