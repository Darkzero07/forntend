import React from "react";
import { Link } from "react-router-dom";
import "./payment.css";

const Payment = () => {
  return (
    <div className="payment-card">
      <div className="payment-qr">
        <img src="../src/assets/promtpay.png" alt="pp" />
      </div>
      <button>
        <Link to="/upload">อัพโหลดสลิป</Link>
      </button>
    </div>
  );
};

export default Payment;
