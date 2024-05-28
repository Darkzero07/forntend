import Iconfootball from "../src/assets/icon-football.png";
import Line from "../src/assets/line.png";
import Facebook from "../src/assets/facebook.png";
import Instragram from "../src/assets/instragram.png";
import '../components/footer.css'

function footer() {
  return (
 
      <div className="footer-container">
        <div className="footer-icontext">
          <img
            src={Iconfootball}
            className="footer-icon"
          ></img>
          <div>
            <h3 style={{textAlign:'left'}}>ฟุตบอลอารีน่า</h3>
            <p>24/30 กำแพงเพชร 6 ถนน, ลาดยาว, จตุจักร, กรุงเทพฯ 10900</p>
          </div>
        </div>

        <div
          className="footer-socials"
        >
          <h4>ติดตามเราได้ที่ | </h4>
          <div>
            <img src={Line} className="footer-social" />
            <img src={Facebook} className="footer-social" />
            <img src={Instragram} className="footer-social" />
          </div>
        </div>
      </div>
    
  );
}

export default footer;
