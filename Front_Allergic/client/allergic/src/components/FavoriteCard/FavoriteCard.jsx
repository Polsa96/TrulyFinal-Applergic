import React, { useEffect, useState } from 'react';
import { API } from '../../shared/services/api';
import "./FavoriteCard.scss";

const FavoriteCard = ({favId, props}) => {

  const [foodFavorite, setFoodFavorite]=useState([])
  let newFav=props.user.fav;

  useEffect(() => {

     API.get("api/food/"+favId).then((res) => {
      // console.log(res.data);
      setFoodFavorite(res.data);
    });

  },[])


  const deleteFavorites = ()=>{
    let i = newFav.indexOf(favId); //hay que quitarle el elemento favId
    props.setUser({...props.user, ...newFav.splice(i,1)})
    // console.log(i);
    // console.log(props.user.id)
    // console.log(props.user);
    // console.log(favId)
    API.patch("api/users/pull/"+props.user.id, {fav:props.user.fav}).then((res) => {
      console.log(res);
      // console.log("HE ENVIADO LA PETICIONNNNNNN")
     
    });
  }




  return (
    <div className="favorite-card">
        <div className="favorite-card--image">
            <img src={foodFavorite.img} alt={foodFavorite.name}/>
        </div>
        <div className="favorite-card--product">
            <h4>{foodFavorite.name}</h4>
            <p><span>Ingredientes: </span>{foodFavorite.ingredients}</p>
        </div>
        <div className="favorite-card--delete" onClick={()=>deleteFavorites()}>
             <img src="./Images/registerCrossImage.png" alt="Cross Image"/>{/* DELETE */}
        </div>
    
    </div>
  )
}

export default FavoriteCard