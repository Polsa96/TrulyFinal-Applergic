import React from 'react';
import { Link } from "react-router-dom";
import "./Terms.scss"


const Terms = () => {
  return <div className="terms">
  <img className="terms--img" src="./Images/construccion.png" alt="en construcción"/>
  <div className="terms--button">
            <Link className="terms--button--btn" to="/home">
              Volver
            </Link>
          </div>
  </div>;
};

export default Terms;
