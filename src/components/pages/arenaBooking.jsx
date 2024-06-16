import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { Card } from "antd";
import Footballcard from "../../assets/football-card.png";
import { useNavigate } from "react-router-dom";
import "../styles/arenaBooking.css";

const ArenaBooking = () => {
  const [arenas, setArenas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArenas();
  }, []);

  const fetchArenas = async () => {
    try {
      const response = await axios.get("/arena/getArenas");
      setArenas(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const handleCardClick = (arena_id, arena_priceHour) => {
    navigate(`/timepicker/${arena_id}/${arena_priceHour}`);
  };

  return (
    <div className="booking">
      <h1>เลือกสนาม</h1>
      <div className="booking-card">
        {arenas.map((arena) => (
          <div className="arena-card" key={arena.id}>
            <img src={Footballcard} alt={arena.arena_name} />
            <Card
              title={arena.arena_name}
              style={{ width: 300 }}
            >
              <p>Location: {arena.arena_location}</p>
              <p>ขนาด: {arena.arena_players} คน</p>
              <button onClick={() => handleCardClick(arena.id, arena.arena_priceHour)}>
                {arena.arena_priceHour} / ชั่วโมง
              </button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArenaBooking;
