import "../components/booking.css";
import Footballcard from "../src/assets/football-card.png";
import { UserOutlined } from "@ant-design/icons";

const Booking = () => {
  return (
    <container className="">
      <div className="">
        <div className="bodys">
          <div className="">
            <h1>เลือกสนาม</h1>
          </div>

          <div style={{display:"flex" , justifyContent:"space-evenly"}}>
            {/* Card Football */}
            <div className="card-football">
              <img src={Footballcard} />
              <div style={{ marginLeft: "12px" }}>
                <h3>สนาม Stadium 1</h3>
                <p>
                  สนามฟุตบอลหญ้าเทียม 7 คน ขนาด 53 x 33 เมตร พื้นสนามได้มาตรฐาน
                  ใช้วัสดุหญ้าเทียมเกรดคุณภาพดี ระบบไฟส่องสว่างทั่วสนาม
                </p>
              </div>
              <div className="booking-number">
                <UserOutlined />
                <p style={{ marginLeft: "4px" }}>7</p>
              </div>
              <div className="booking-number">
                <button className="button">800 / ชั่วโมง</button>
              </div>
            </div>
            {/* Card Football */}

            {/* Card Football */}
            <div className="card-football">
              <img src={Footballcard} />
              <div style={{ marginLeft: "12px" }}>
                <h3>สนาม Stadium 2</h3>
                <p>
                  สนามฟุตบอลหญ้าเทียม 7 คน ขนาด 53 x 33 เมตร พื้นสนามได้มาตรฐาน
                  ใช้วัสดุหญ้าเทียมเกรดคุณภาพดี ระบบไฟส่องสว่างทั่วสนาม
                </p>
              </div>
              <div className="booking-number">
                <UserOutlined />
                <p style={{ marginLeft: "4px" }}>7</p>
              </div>
              <div className="booking-number">
                <button className="button">800 / ชั่วโมง</button>
              </div>
            </div>
            {/* Card Football */}

            {/* Card Football */}
            <div className="card-football">
              <img src={Footballcard} />
              <div style={{ marginLeft: "12px" }}>
                <h3>สนาม Stadium 3</h3>
                <p>
                  สนามฟุตบอลหญ้าเทียม 7 คน ขนาด 53 x 33 เมตร พื้นสนามได้มาตรฐาน
                  ใช้วัสดุหญ้าเทียมเกรดคุณภาพดี ระบบไฟส่องสว่างทั่วสนาม
                </p>
              </div>
              <div className="booking-number">
                <UserOutlined />
                <p style={{ marginLeft: "4px" }}>7</p>
              </div>
              <div className="booking-number">
                <button className="button">800 / ชั่วโมง</button>
              </div>
            </div>
            {/* Card Football */}

            {/* Card Football */}
            <div className="card-football">
              <img src={Footballcard} />
              <div style={{ marginLeft: "12px" }}>
                <h3>สนาม Stadium 4</h3>
                <p>
                  สนามฟุตบอลหญ้าเทียม 7 คน ขนาด 53 x 33 เมตร พื้นสนามได้มาตรฐาน
                  ใช้วัสดุหญ้าเทียมเกรดคุณภาพดี ระบบไฟส่องสว่างทั่วสนาม
                </p>
              </div>
              <div className="booking-number">
                <UserOutlined />
                <p style={{ marginLeft: "4px" }}>11</p>
              </div>
              <div className="booking-number">
                <button className="button">800 / ชั่วโมง</button>
              </div>
            </div>
            {/* Card Football */}



          </div>
        </div>
        <div>
          <div className="">
            <h1>เลือกวันที่</h1>
          </div>
        </div>
      </div>
    </container>
  );
};

export default Booking;
