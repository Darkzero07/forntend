import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DatePicker, Space, notification } from "antd";
import axios from "../../config/axios";
import "../styles/timePicker.css";
import localStorageService from "../../services/localStorageService";
import useNotification from "antd/es/notification/useNotification";

const TimePicker = () => {
  const { arena_id, arena_priceHour } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const times = [
    { time_start: "10:00", time_end: "11:00" },
    { time_start: "11:00", time_end: "12:00" },
    { time_start: "12:00", time_end: "13:00" },
    { time_start: "13:00", time_end: "14:00" },
    { time_start: "14:00", time_end: "15:00" },
    { time_start: "15:00", time_end: "16:00" },
    { time_start: "16:00", time_end: "17:00" },
    { time_start: "17:00", time_end: "18:00" },
    { time_start: "18:00", time_end: "19:00" },
    { time_start: "19:00", time_end: "20:00" },
    { time_start: "20:00", time_end: "21:00" },
    { time_start: "21:00", time_end: "22:00" },
    { time_start: "22:00", time_end: "23:00" },
    { time_start: "23:00", time_end: "24:00" },
    { time_start: "00:00", time_end: "01:00" },
    { time_start: "01:00", time_end: "02:00" },
  ];

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchBookedSlots = async (date) => {
    try {
      const response = await axios.get(
        `/booking/getBooked/${arena_id}/${date}`
      );
      setBookedSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleTimePicker = (time_satrt, time_end) => {
    alert(`เลือกเวลา ${time_satrt} ถึงเวลา ${time_end}`);

    setTimeStart(time_satrt);
    setTimeEnd(time_end);
  };

  const handleBooking = async (dateString) => {
    const token = localStorageService.getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    if (!timeStart || !timeEnd) {
      alert("Please select a timeslot");
      return;
    }

    const duration = parseInt(timeEnd.split(":")[0] - timeStart.split(":")[0]);
    const totalPrice = parseInt(arena_priceHour) * duration;
    const bookingData = {
      arena_id,
      date: dateString,
      time_start: timeStart,
      time_end: timeEnd,
      duration: duration,
      total_price: totalPrice,
      status: "pending",
    };
    console.log(bookingData);

    try {
      const response = await axios.post("/booking/newBooking", bookingData);
      console.log("Booking Successful:", response.data);
      const booking_id = response.data.id;
      navigate(`/payment/${booking_id}`);
    } catch (error) {
      console.error("Booking Failed:", error);
    }
  };

  const isSlotBooked = (time_start, time_end) => {
    return bookedSlots.some(
      (slot) => slot.time_start === time_start && slot.time_end === time_end
    );
  };

  return (
    <div className="time">
      <h1>เลือกเวลา</h1>
      <div className="time-datepick">
        <DatePicker onChange={onChange} />
      </div>
      <div className="time-slot">
        <div className="time-select">
          {times.map((slot, index) => (
            <div className="time-button" key={index}>
              <button
                onClick={() => handleTimePicker(slot.time_start, slot.time_end)}
                style={{
                  backgroundColor: isSlotBooked(slot.time_start, slot.time_end)
                    ? "red"
                    : "",
                }}
              >
                {slot.time_start} - {slot.time_end}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="time-booking-button">
        <button onClick={() => handleBooking(selectedDate)}>จอง</button>
      </div>
      <div className="time-status">
        <button className="time-available">Available</button>
        <button className="time-not-available">Not Available</button>
      </div>
    </div>
  );
};

export default TimePicker;
