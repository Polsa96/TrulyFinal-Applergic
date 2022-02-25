import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss'

const NavBar = () => {
  return <div className="navbar">
     <NavLink className="navbar__navlink" to="/">
     <img className="navbar__navlink--img" src="./Images/navBarIconHome.png" alt="Icon Home" />
     </NavLink>
     <NavLink className="navbar__navlink" to="/favorite">
     <img className="navbar__navlink--img" src="./Images/navBarIconStar.png" alt="Icon Star" />
     </NavLink>
     <NavLink className="navbar__navlink" to="/diary">
     <img className="navbar__navlink--img" src="./Images/navBarIconDiary.png" alt="Icon Diary" />
     </NavLink>
     <NavLink className="navbar__navlink" to="/shared">
     <img className="navbar__navlink--img" src="./Images/navBarIconShared.png" alt="Icon Shared" />
     </NavLink>
      

  </div>;
};

export default NavBar;
