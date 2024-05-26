import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./imageUpload.css";

const ImageUpload = () => {
  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:4000/upload", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="upload">
      <div className="container">
        <Link to="/upload">Upload Slip</Link>
        <br />
        <input type="file" onChange={handleFile} />
        <br />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default ImageUpload;
