import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";
import "../styles/bookingResult.css";

function bookingResult() {
  const { booking_id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [result, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/booking/getBookingById/${booking_id}`);
      setResults(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      setLoading(false);
    }
  };
  
  return (
    <div className="booking-result">
      <h1>Congratulation!</h1>
      <span>
        Your booking is complete. If you need any further assistance or have
        questions about your reservation, feel free to ask or{" "}
        <Link to="/contact">contact us</Link>. Enjoy your experience!
      </span>

      {result.map((result) => (
        <div className="booking-info" key={result.id}>
          <p>Your booking ID: {booking_id} </p>
          <p>สนาม: {result.arena_id}</p>
          <p>วันที่: {result.date}</p>
          <p>
            เวลา: {result.time_start} - {result.time_end}
          </p>
          <p>ราคา: {result.total_price}</p>
        </div>
      ))}
      <Link to="/"><p>CLOSE</p></Link>
    </div>
  );
}

export default bookingResult;
