import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import axios from "../../config/axios";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";

// const Register = (props) => {
const Register = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    const body = {
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      password: values.password,
      email: values.email,
      phone: values.phone,
    };
    axios
      .post("/auth/register", body)
      .then((res) => {
        notification.success({
          message: `${values.firstname} register succes`,
        });
        navigate("/login");
        // props.history.push("/login");
      })
      .catch((err) => {
        notification.error({
          message: "register failed",
        });
      });
  };

  return (
    <div className="register-form">
      <div className="register-box">
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
            autoComplete="off"
          >
            <Form.Item
              label={
                <span className=" register-label-fname">firstname&nbsp;</span>
              }
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
              label={
                <span className=" register-label-lname">lastname&nbsp;</span>
              }
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
              label={
                <span className=" register-label-user">username&nbsp;</span>
              }
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
              label={
                <span className=" register-label-password">password&nbsp;</span>
              }
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
              label={
                <span className=" register-label-phone">phone no.&nbsp;</span>
              }
              name="phone"
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
              <Button
                className="register-button"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
