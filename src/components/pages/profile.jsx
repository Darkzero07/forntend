import React, {useState, useEffect} from "react";
import "../styles/profile.css";
import { jwtDecode } from "jwt-decode";
import localStorageService from "../../services/localStorageService";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Profile(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorageService.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.isAdmin);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
  };

  return (
    <div className="profile-body">
      <div className="profile-welcome">
        <h1> Welcome</h1>
        <p>user: {jwtDecode(localStorageService.getToken()).username}</p>
        {isAdmin && (
          <>
            <Link className="dashboard-link" to='/dashboard'>Dashboard</Link>
            <br />
            <br />
          </>
        )}
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
