import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";

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
    <div>
      <h1>bookingResult</h1>
      <h2>bookingID : {booking_id}</h2>
    </div>
  );
}

export default bookingResult;
