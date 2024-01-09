import { Link } from "react-router-dom"
import "./Header.css"
import { useState } from "react";

import { CiMenuBurger } from "react-icons/ci";
// eslint-disable-next-line react/prop-types
function Header({ switchView,toggleBorder }) {
const [menuVisible, setMenuVisible] = useState(false);
const toggleMenu = () => {
  setMenuVisible(!menuVisible);
  };
  
  const handleSigninClick = () => {
    switchView('signin');
     toggleBorder();
  };
  

  return (
      <div className="header">
          <div className="headlogoandlinks">
              <div style={{cursor: 'pointer'}} className="headlogo">
                    <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png" alt="" />
              </div>
              <div className="headlinks">
                  <CiMenuBurger className="menuicon" onClick={toggleMenu}/>
                  <ul className={menuVisible ? "menu-visible" : "menu-hidden"}>
                     <li><Link to="/" >Home</Link></li>
                      <li><Link to="https://www.evangadi.com/explained/">How it works</Link></li>
                  <Link onClick={handleSigninClick} className="headsigninbutton"  style={{color:"white",textDecoration:"none"}} ><li style={{color:"white",fontFamily:"Lato",cursor:"pointer",textDecoration:"none"}} className="headsignin">SIGN IN</li></Link>
                  </ul>
              </div>
          </div>

          
          
    </div>
  )
}

export default Header