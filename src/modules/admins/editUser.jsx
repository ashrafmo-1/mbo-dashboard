import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useEditUserHook } from "./Hooks/useEditUserHook";
import { useGetSingleUserHook } from "./Hooks/useGetSingleUserHook";

export const EditUser = ({ userId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { editUser } = useEditUserHook();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError } = useGetSingleUserHook(
    isModalVisible ? userId : null
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await editUser(userId, values);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to edit user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status,
        address: data.address,
        description: data.description,
      });
    }
  }, [data, form]);

  return (
    <div>
      <Button
        className="edit border-green-900"
        outline="true"
        onClick={showModal}
      >
        <EditOutlined />
      </Button>
      <Modal
        title="Edit Admin"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required." }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Username is required." }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required." },
              { type: "email", message: "Please enter a valid email." },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone is required." }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required." }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Status is required." }]}
              >
                <Select placeholder="Select status">
                  <Select.Option value="1">Active</Select.Option>
                  <Select.Option value="0">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Role"
                name="roleId"
                rules={[{ required: true, message: "Role is required." }]}
              >
                <Select placeholder="Select role">
                  <Select.Option value={1}>Admin</Select.Option>
                  <Select.Option value={2}>User</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required." }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Edit User
          </Button>
        </Form>
      </Modal>
    </div>
  );
};