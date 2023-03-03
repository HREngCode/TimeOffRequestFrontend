import React from 'react';
import "./Header.css";
import logo from "../../assets/StrsLogo.jpg"


const Header = () => {
    return (
        <div className="header">
            <header>
                <img className="header_image" src={logo} alt=""/>
            </header>
            <div className='header-title'>
                <h2>Time Off Request</h2>
            </div>
        </div>
    );
  };
  
 
export default Header;