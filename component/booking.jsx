import "../component/booking.css";
import Footballcard from "../src/assets/football-card.png";
import { UserOutlined } from "@ant-design/icons";
import axios from 'axios'
import { useEffect, useState } from "react";
import { Button,message } from 'antd';

const Booking = () => {

  const [Data , setData ] = useState({})
  const [Arena , setArena] = useState([])

  const Url = "http://192.168.1.199:8080/api/v1/auth/login"
  const UrlStadium = "http://192.168.1.199:8080/api/v1/arena/getArenas"

  const Key = Data.access_token

  const [messageApi, contextHolder] = message.useMessage();
  
  
    messageApi.success({
      type: 'success',
      content: Data.status,
    });
 

  useEffect(()=>{
    axios.post(Url,{
      "username":"admin",
      "password":"1234"
      }).then(res => {
      setData(res.data)
    }).catch(err => {
      console.log(err,"<<<<<Login")
    })
  },[])


  useEffect(()=>{
    axios.get(UrlStadium,{
      headers: {
        'Authorization': `Bearer ${Key}`,
      }
      }).then(res => {
      setArena(res.data)
      console.log(res.data);
    }).catch(err => {
      console.log(err)
    })
  },[Key]);

  const sortedArena = [...Arena].sort((a, b) => a.arena_name.localeCompare(b.arena_name));
  


  return (
    <container>
      {contextHolder}
      <div>
        <div className="bodys">
          <div>
            <h1>เลือกสนาม</h1>
          </div>

        <div style={{ display: "flex", overflow: 'scroll' }}>        
          {sortedArena && sortedArena.length > 0 ? (
        sortedArena.map((data) => (
          <div  key={data.id}>
            <div className="card-football">
              <img src={Footballcard} alt={data.arena_name} />
              <div style={{ marginLeft: "12px" }}>
                <h3>{data.arena_name}</h3>
                <p> สนามฟุตบอลหญ้าเทียม 7 คน ขนาด 53 x 33 เมตร พื้นสนามได้มาตรฐาน
                  ใช้วัสดุหญ้าเทียมเกรดคุณภาพดี ระบบไฟส่องสว่างทั่วสนาม</p>
              </div>
              <div className="booking-number">
                <UserOutlined />
                <p style={{ marginLeft: "4px" }}>{data.arena_players}</p>
              </div>
              <div className="booking-number">
                <button className="button">{data.arena_priceHour} / ชั่วโมง</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      </div>     
        </div>
        <div>
        </div>
      </div>
    </container>
  );
};

export default Booking;
