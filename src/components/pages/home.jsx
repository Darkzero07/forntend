import "../styles/home.css";
import Sliderimg from "../../assets/sliderImage.png";
import Sliderimgs from "../../assets/Sale.webp";
import Background from "../../assets/Background-football.png";
import { Carousel } from "antd";
import { Link } from "react-router-dom";


const Home = () => {
  const contentStyle = {
    margin: 0,
    height: "400px",
    color: "#fff",
    lineHeight: "160px",
    width: "688px",
  };

  const images = [Sliderimg, Sliderimgs];

  const carouselSettings = {
    autoplay: true,
    draggable: true,
    dotPosition: "top",
    arrows: true,
    // prevArrow: <PrevArrow2 slideCount={images.length} />,
    // nextArrow: <NextArrow2 slideCount={images.length} />,
  };

  return (
    <div className="overall">
      <div className="first-section body">
        <div className="content">
          <h1>สนาม อารีน่า ยินดีต้อนรับ</h1>
          <h2>
            สนามฟุตบอลในร่มหญ้าเทียมแห่งแรกในย่านธุรกิจใจกลางเมืองเดินทางสะดวก
            เข้าออกได้จากซอยโปโลด้านถนนวิทยุ หรือ ซอยปลูกจิต ถนนพระรามสี่
          </h2>
          <Link to="/arenaBooking" ><button className="button">จอง</button></Link>
        </div>
        <div className="carousel">
          <Carousel {...carouselSettings}>
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} style={contentStyle} alt="" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      <div>
        <div className="second-section">
          <h1>ข่าวสาร / กิจกรรม </h1>
        </div>
        <div className="background-activity">
          <div className="card-activity">
            <img src={Background} className="img-activity" />
            <p className="text-activity">
              จองสนามวันนี้ รับเวลาเพิ่มฟรี 30 นาที!
              สนามฟุตบอลในร่มโปรโมชั่นพิเศษ เพียงจองวันนี้
              รับเพิ่มเวลาเล่นในระหว่างสนามไปอีกครึ่งชั่วโมงฟรี!
              อย่าพลาดโอกาสสนุกเล่นฟุตบอลในสนามที่มั่นคงและปลอดภัย จองเลยวันนี้!
            </p>
          </div>

          <div style={{ position: "relative", color: "white" }}>
            <img src={Background} className="img-activity" />
            <p className="text-activity">
              จองสนามวันนี้ รับเวลาเพิ่มฟรี 30 นาที!
              สนามฟุตบอลในร่มโปรโมชั่นพิเศษ เพียงจองวันนี้
              รับเพิ่มเวลาเล่นในระหว่างสนามไปอีกครึ่งชั่วโมงฟรี!
              อย่าพลาดโอกาสสนุกเล่นฟุตบอลในสนามที่มั่นคงและปลอดภัย จองเลยวันนี้!
            </p>
          </div>

          <div style={{ position: "relative", color: "white" }}>
            <img src={Background} className="img-activity" />
            <p className="text-activity">
              จองสนามวันนี้ รับเวลาเพิ่มฟรี 30 นาที!
              สนามฟุตบอลในร่มโปรโมชั่นพิเศษ เพียงจองวันนี้
              รับเพิ่มเวลาเล่นในระหว่างสนามไปอีกครึ่งชั่วโมงฟรี!
              อย่าพลาดโอกาสสนุกเล่นฟุตบอลในสนามที่มั่นคงและปลอดภัย จองเลยวันนี้!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
