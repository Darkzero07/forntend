import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="home">
        <Link to="/">Home</Link>
      </div>
      <div className="booking">
        <Link to="/Booking">Booking</Link>
      </div>
      <div className="contact">
        <Link to="/Contact">Contact Us</Link>
      </div>
      <div className="nav-button">
        <div className="login ">
          <button>
            <Link to="/Login">Login</Link>
          </button>
        </div>
        <div className="register">
          <button>
            <Link to="/Register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
