import React from "react";
import { Row, Col } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-text">
        <h1>Contact Us</h1>
      </div>
      <div className="contact-info">
        <div style={{ width: "50%", height: "580px",  }}>
          <iframe
            title="location-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.0305071034286!2d100.50140891528052!3d13.756330990351824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29edbe06d1af3%3A0x102b35d255cb0c7d!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2sth!4v1617890252046!5m2!1sen!2sth"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="contact-data">
          <div style={{ padding: "20px" }}>
            <Row align="middle" style={{ marginBottom: "10px" }}>
              <Col span={2}>
                <PhoneOutlined style={{ fontSize: "24px", color: "green" }} />
              </Col>
              <Col span={8}>0xx-xxx-xxxx</Col>
            </Row>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Contact;
