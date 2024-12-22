import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDeleteProductCategoryHook } from "./hooks/useDeleteProductCategoryHook";

export const DeleteProductCategory = ({ productCategoryId }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { deleteProductsCategory } = useDeleteProductCategoryHook();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    await deleteProductsCategory(productCategoryId);
    setLoading(false);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button danger className="del" onClick={showModal}>
        <DeleteOutlined />
      </Button>

      <Modal title="Confirm Deletion" visible={isModalVisible} onOk={handleOk}
        onCancel={handleCancel} confirmLoading={loading}
      >
        <p>Are you sure you want to delete this product category?</p>
      </Modal>
    </div>
  );
};