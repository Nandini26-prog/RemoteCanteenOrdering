import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
const [menu,setMenu] = useState("home");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo'/>
      <ul className="navbar-menu">
        <li className={menu==="home"?"active":""}>HOME</li>
        <li className={menu==="menu"?"active":""}>MENU</li>
        <li className={menu==="mobile-app"?"active":""}>MOBILE-APP</li>
        <li className={menu==="contact-us"?"active":""}>CONTACT-US</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="nabvar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
        </div>
        <button>SIGN IN</button>
      </div>
    </div>
  )
}

export default Navbar
