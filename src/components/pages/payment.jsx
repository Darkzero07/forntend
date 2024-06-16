import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/payment.css";

const Payment = () => {
  const { booking_id } = useParams();
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate(`/slipUpload/${booking_id}`);
  };

  return (
    <div className="payment-card">
      <h2>Booking ID: {booking_id}</h2>
      <div className="payment-qr">
        <img src="../src/assets/promtpay.png" alt="qr" />
      </div>
      <div className="payment-upload">
        <button onClick={() => handleUpload()}>อัพโหลดสลิป</button>
      </div>
    </div>
  );
};

export default Payment;
