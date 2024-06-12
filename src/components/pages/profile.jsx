import React from "react";
import "../styles/profile.css";
import { jwtDecode } from "jwt-decode";
import localStorageSrevice from "../../services/localStorageService";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Profile(props) {
  const logout = () => {
    localStorageSrevice.removeToken();
    props.setRole("guest");
  };

  return (
    <div className="profile-body">
      <div className="profile-welcome">
        <h1> Welcome</h1>
        <p>user: {jwtDecode(localStorageSrevice.getToken()).username}</p>
        <Link className="dashboard-link" to='/dashboard'>Dashboard</Link>
        <br />
        <br />
        <Link className="booking-link" to='/arenaBooking'>Booking Arena</Link>
        <br />
        <br />
        <br />
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Profile;
