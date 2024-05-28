import NavLinks from "./navlinks";
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import "./navbar.css";

const Burger = () => {
  const [click, setclick] = useState(false);

  const burger = (
    <MdOutlineMenu
      className="burgerMenu"
      size="30px"
      color="black"
      onClick={() => setclick(!click)}
    />
  );

  const Close = (
    <MdClose
      className="burgerMenu"
      size="30px"
      color="black"
      onClick={() => setclick(!click)}
    />
  );

//   const closeMenu = () => setclick(false);

  return (
    <nav className="nav-burger">
      {/* {click ? Close : burger} */}
      {click ? Close : burger}
      {/* {click && <NavLinks isClicked={true} closeMenu={closeMenu}/>} */}
      {click && <NavLinks isClicked={true} />}
    </nav>
  );
};

export default Burger;
