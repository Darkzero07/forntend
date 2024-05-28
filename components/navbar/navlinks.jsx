import { Link } from "react-router-dom";
import "./navbar.css";

const NavLinks = ({ isClicked, closeMenu }) => {
  return (
    <nav className="nav-links">
      <ul>
        <div className="home">
          <Link to="/">Home</Link>
        </div>
        <div className="booking">
          <Link to="/Booking">Booking</Link>
        </div>
        <div className="contact-us">
          <Link to="/Contact">Contact Us</Link>
        </div>
        <div className="login">
          <button>
            <Link to="/Login">Login</Link>
          </button>
        </div>
        <div className="register">
          <button>
            <Link to="/Register">Register</Link>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default NavLinks;
