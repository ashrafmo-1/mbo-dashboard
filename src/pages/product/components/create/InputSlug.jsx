import { Col, Form, Input, Row } from "antd";

export const InputSlug = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label="slug english"
          name="slugEn"
          rules={[{ required: true, message: "slug english is required." }]}
        >
          <Input placeholder="Enter slug english" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="slug arabic"
          name="slugAr"
          rules={[{ required: true, message: "slug arabic is required." }]}
        >
          <Input placeholder="Enter slug arabic" />
        </Form.Item>
      </Col>
    </Row>
  );
};