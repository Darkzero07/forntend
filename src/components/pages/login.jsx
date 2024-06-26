import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import axios from "../../config/axios";
import localStorageService from "../../services/localStorageService";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const body = {
      username: values.username,
      password: values.password,
    };
    axios
      .post("/auth/login", body)
      .then((result) => {
        console.log(result);
        localStorageService.setToken(result.data.access_token);
        const role = localStorageService.getRole();
        props.setRole(role);

        if (role === "admin") {
          navigate("/dashboard");
        } else if (role !== "guest") {
          navigate("/profile");
        } else {
          navigate("/register");
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Login failed",
        });
      });
  };

  return (
    <div className="login-form">
      <div className="login-box">
        <div className="login-formbasic">
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
              label={<span className="login-label-user">username&nbsp;</span>}
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
                <span className="login-label-password">password&nbsp;</span>
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
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button className="login-button" type="primary" htmlType="submit">
                Submit
                <p>Don't have account?</p>
                <Link to="/register">
                  <span>Sign Up</span>
                </Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="signup">
          <p>Don't have account?</p>
          <Link to="/register">
            <p>Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
