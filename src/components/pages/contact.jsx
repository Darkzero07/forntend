// contact.jsx
import React from "react";
import "../styles/contact.css";
import Map from "../../services/map";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-text">
        <h1>Contact Us</h1>
      </div>
      <div className="contact-info">
        <div className="contact-map">
        <Map />
        </div>
        <div className="contact-data">
          <div className="contact-phone">
            <img src="../src/assets/icons8-phone-64.png" alt="phone" />
            <span>0X-XXXX-XXXX</span>
          </div>
          <div className="contact-line">
            <img src="../src/assets/line.png" alt="line" />
            <span>@ Line</span>
          </div>
          <div className="contact-ig">
            <img src="../src/assets/instragram.png" alt="instagram" />
            <span>@ IG</span>
          </div>
          <div className="contact-fb">
            <img src="../src/assets/facebook.png" alt="facebook" />
            <span>@ FB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;3