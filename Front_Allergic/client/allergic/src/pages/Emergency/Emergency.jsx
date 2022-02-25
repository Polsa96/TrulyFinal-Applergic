import { DILATE } from 'quagga';
import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { API } from '../../shared/services/api';
import "./Emergency.scss";



const Emergency = () => {

  const [DataGET, SetDataGET]= useState([])
  
  

  useEffect(() => {
   API.get("api/users/"+JSON.parse(localStorage.getItem("id"))).then((res) => {
    console.log(JSON.parse(localStorage.getItem("id")));
    SetDataGET( res.data.contact)

    
  })},[])
  return (
    
    <div className="Sos">

      {DataGET ? 
      <div className="Sos__content">

        <h1>Tu contacto de emergencia: </h1>

        <div className="Sos__content__main">
          <div className="Sos__content__main__spaceDiv">
            <p>
              <span>Nombre completo de tu contacto: </span>
              {DataGET.sosname}
            </p>
            <p>
              <span>Dirección e-mail: </span>
              {DataGET.sosemail}
            </p>
             <p>
              <span>Móvil: </span>
              {DataGET.sosphone}
            </p> 
            <p>
              <span>Compañia de Seguros / Nº Póliza: </span>
              {DataGET.assurance}
            </p>
          </div>


          <div className="Sos__content__main__buttons">
            <button
              className="Sos__content__main__buttons__btn Sos__btn--pink"
              name="Emergencia"
            >
              Llamar a Emergencias
            </button>
            <Link className="Sos__content__main__buttons__btn" to="/home">
              Volver
            </Link>
          </div>
        </div>

      </div>

      : 
      <h3>En caso de Emergencia por favor atiendan los siguientes datos:</h3>
      }
    </div> 
    
  );
}
  

  
export default Emergency;