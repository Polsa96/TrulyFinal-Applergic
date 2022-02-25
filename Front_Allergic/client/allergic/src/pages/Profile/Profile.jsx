import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { API } from '../../shared/services/api';
import "./Profile.scss";



const Profile = () => {

  const [DataGET, SetDataGET]= useState([])
  
  

  useEffect(() => {
   API.get("api/users/"+JSON.parse(localStorage.getItem("id"))).then((res) => {
    console.log(JSON.parse(localStorage.getItem("id")));
    SetDataGET( res.data)
  })},[])


  return (
    
    <div className="Profile">

      {DataGET ? 
      <div className="Profile__content">

        <h1>Tus datos de contacto</h1>
        <div className='Profile__img'>
        <img src="./Images/registerCameraImage.png" alt="Camera Icon"/>
        <p className="image">Imagen de Perfil</p>
      </div>
        <div className="Profile__main">

            <div></div>
          <div className="Profile__spaceDiv">
            <p>
              <span>nombre: </span>
              {DataGET.name}
            </p>
            <p>
              <span>Dirección e-mail: </span>
              {DataGET.email}
            </p>
             <p>
              <span>Móvil: </span>
              {DataGET.phone}
            </p> 
            <p>
              <span>Alérgenos: </span>
              {DataGET.allergen}
            </p>
            
          </div>


          <div className="Profile__buttons">
            <Link className="Profile__btn" to="/home">
              Volver
            </Link>
          </div>
        </div>

      </div>

      : 
      <h3>Estos son tus datos:</h3>
      }
    </div> 
    
  );
}
  

  
export default Profile;