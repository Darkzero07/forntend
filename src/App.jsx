import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/navbar/navbar";
import Home from "../components/home";
import Booking from "../components/booking";
import Contact from "../components/contact";
import Register from "../components/register";
import Login from "../components/login";
import "./App.css";
import Footer from "../components/footer";
import ImageUpload from "../components/imageUpload";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/booking" element={<Booking />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/upload" element={<ImageUpload />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
