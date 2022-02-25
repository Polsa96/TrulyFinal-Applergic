import React from 'react';
import { Link } from "react-router-dom";
import "./Shared.scss"


const Shared = () => {
  return <div className="shared">
  <img className="shared--img" src="./Images/construccion.png" alt="en construcción"/>
  <div className="shared--button">
            <Link className="shared--button--btn" to="/home">
              Volver
            </Link>
          </div>
  </div>;
};

export default Shared;
