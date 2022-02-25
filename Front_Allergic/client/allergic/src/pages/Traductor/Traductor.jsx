import React from "react";
import { Link } from "react-router-dom";
import "./Traductor.scss";

const Traductor = () => {
  return (
    <div className="translator">
      <img
        className="translator--img"
        src="./Images/construccion.png"
        alt="en construcción"
      />
      <div className="translator--button">
        <Link className="translator--button--btn" to="/home">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default Traductor;
