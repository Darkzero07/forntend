import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./register.css";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Register = () => (
  <div className="register-form">
    <div className="register-formbasic">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<span className=" register-label-fname">firstname&nbsp;</span>}
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className=" register-label-lname">lastname&nbsp;</span>}
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className=" register-label-user">username&nbsp;</span>}
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className=" register-label-password">password&nbsp;</span>}
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label={<span className=" register-label-email">email&nbsp;</span>}
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

   <Form.Item
          label={<span className=" register-label-phone">phone no.&nbsp;</span>}
          name="phone no."
          rules={[
            {
              required: true,
              message: "Please input your phone no.!",
            },
          ]}
        >
          <Input />
        </Form.Item>        

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="register-button" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);
export default Register;
