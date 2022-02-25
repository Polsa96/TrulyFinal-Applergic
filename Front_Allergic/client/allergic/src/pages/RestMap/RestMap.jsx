import React from 'react';
import { Link } from "react-router-dom";
import "./RestMap.scss"


const RestMap = () => {
  return <div className="restmap">
  <img className="restmap--img" src="./Images/construccion.png" alt="en construcción"/>
  <div className="restmap--button">
            <Link className="restmap--button--btn" to="/home">
              Volver
            </Link>
          </div>
  </div>;
};

export default RestMap;
