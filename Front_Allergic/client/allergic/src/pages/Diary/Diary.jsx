import React from 'react';
import { Link } from "react-router-dom";
import "./Diary.scss"


const Diary = () => {
  return <div className="diary">
  <img className="diary--img" src="./Images/construccion.png" alt="en construcción"/>
  <div className="diary--button">
            <Link className="diary--button--btn" to="/home">
              Volver
            </Link>
          </div>
  </div>;
};

export default Diary;
