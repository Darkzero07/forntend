import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../component/navbar";
import Home from "../component/home";
import Booking from "../component/booking";
import Contact from "../component/contact";
import Register from "../component/register";
import Login from "../component/login";
import "./App.css";
import Footer from "../component/footer";
import ImageUpload from "../component/imageUpload";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
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
