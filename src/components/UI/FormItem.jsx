import React from "react";
import { Button, Form } from "antd";

import "./FormItem.less";

export const FormSubmit = ({ isLoading, text, ...other }) => {
  return (
    <Form.Item
      style={{ marginBottom: 0 }}
      className="form-submitbtn"
      {...other}
    >
      <Button
        htmlType="submit"
        type="primary"
        shape="round"
        size="large"
        loading={isLoading}
      >
        {text}
      </Button>
    </Form.Item>
  );
};

function FormItem({ input, required, placeholder, name, ...other }) {
  return (
    <Form.Item
      rules={[
        {
          required: required,
          message: `لازم تكتب ${placeholder}`,
        },
      ]}
      name={name}
      {...other}
    >
      {React.cloneElement(input, {
        ...input.props,
        bordered: false,
        size: "large",
        className: `inputstyle-dark ${input.props.className}`,
        placeholder,
      })}
    </Form.Item>
  );
}

export default FormItem;
