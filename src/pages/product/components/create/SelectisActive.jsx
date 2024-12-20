import { Form, Select } from "antd";
import React from "react";

export const SelectisActive = () => {
  return (
    <Form.Item
      label="is active"
      name="isActive"
      rules={[{ required: true, message: "is active is required." }]}
    >
      <Select placeholder="Select status">
        <Select.Option value="1">done</Select.Option>
        <Select.Option value="0">no</Select.Option>
      </Select>
    </Form.Item>
  );
};