import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import "../styles/slipUpload.css";

const ImageUpload = () => {
  const { booking_id, fileName } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("booking_id", booking_id);
    console.log("FormData:", formData);

    await axios
      .post("/slip/upload", formData)
      .then((res) => {
        console.log(res);
        navigate(`/bookingResult/${booking_id}/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="upload">
      <h2>Booking ID: {booking_id}</h2>
      <div className="upload-container">
        <div className="upload-slip">
          <h2>Upload Slip</h2>
          <br />
          <input type="file" onChange={handleFile} />
          <br />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
