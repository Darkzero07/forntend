import React, { useState, useEffect } from "react";
import axios from "../../config/axios";

function bookingResult() {
  const [result, serResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/getBooked/:arena_id/:date");
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      setLoading(false);
    }
  };
  return <div>bookingResult</div>;
}

export default bookingResult;
