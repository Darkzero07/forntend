import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { jwtDecode } from "jwt-decode";
import localStorageService from "../../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("guest");
  const nevigate = useNavigate();

  const toggleSidebar = () => {
    setClick(!click);
  };

  const fetchUserData = () => {
    const token = localStorageService.getToken();
    if (token && typeof token === "string") {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleClickProfile = () => {
    nevigate("/profile");
  };

  return (
    <>
      <nav className="nav">
        <button className="hamburger" onClick={toggleSidebar}>
          &#9776; {/* Hamburger icon */}
        </button>
        <div className={`sidebar ${click ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/arenaBooking" onClick={toggleSidebar}>
                Booking
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleSidebar}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={toggleSidebar}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={toggleSidebar}>
                Register
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-user">
          <button onClick={handleClickProfile}><UserOutlined />{username}</button>
        </div>
      </nav>
      {click && <div className="backdrop" onClick={toggleSidebar}></div>}
    </>
  );
};

export default NavBar;
