import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import { API } from '../../shared/services/api';
import "./Favorite.scss";


const Favorite = () => {

const [userFavorites, setUserFavorites]=useState([]);
const [user, setUser]=useState([]);
const navigate = useNavigate();

useEffect(() => { 
    API.get("api/users/"+JSON.parse(localStorage.getItem("id"))).then((res) => {
    // console.log(JSON.parse(localStorage.getItem("id")));
    // console.log(res.data.fav);
    if(res.data.fav.length>0){
      setUser(res.data)
      setUserFavorites(res.data.fav);
    }
  });

}, [])






  return <div className="favorites">

  <div className="favorites--page">
      <h4 onClick={() => navigate("/")}>
        <img src="./Images/returnBackImage.png" alt="Back Icon" />
          Volver
      </h4>
  </div>

  <div className="favorites--main">
    <h1>Bienvenido a tu sección de Favoritos</h1>
  
  {userFavorites.length>0 ? 
    <div>
      <hr/>
      
        {userFavorites.map((favId)=>(
          <FavoriteCard favId={favId} key={favId} props={{user,setUser}}/>
        ))}
    </div>
  
  : <div className="favorites--main--none"> <p>¡Vaya! Parece ser que aún no has guardado ningún <span>Producto</span> a Favoritos.</p>
          <p>¡Puedes escanear cualquier producto que te guste y agregarlo a favoritos!</p>
    </div>
  }

  <button className="favorites--main--button" onClick={()=>{navigate("/scanner")}}>Ir a escaner</button>

  </div>
  
  
  
  </div>;
};

export default Favorite;
