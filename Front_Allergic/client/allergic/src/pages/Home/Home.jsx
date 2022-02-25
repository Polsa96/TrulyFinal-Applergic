import React from 'react';
import { Link } from 'react-router-dom';
import HamburguerMenu from '../../components/HamburguerMenu/HamburguerMenu';
import NavBar from '../../components/NavBar/NavBar';
import './Home.scss'


const Home = () => {
  return (<div className="homePage">

<div className="homePage__info">
    
     <button className="homePage__info__btn"><HamburguerMenu/> </button> 
    {/* <button className="homePage__info__btn" ><img src="./Images/homeButtonHamburguer.png" alt="hamburguer button"/></button> */}
    <button className="homePage__info__btn"><img src="./Images/homeButtonInfo.png" alt="info button"/></button>
    
    </div>

    <div className="homePage__title">
    <img src="./Images/logoApplergic.png" alt="logo Applergic" />
    <h2>Applergic</h2>
    <h6>Mi guía alimentaria</h6>
    </div>
    
    <div className="homePage__main">
    <Link to="/scanner"><button className="homePage__main__btn btn-blue"><img src="./Images/homebarcodeimgButton.png" alt="barcode button"/><p>Escanear</p></button></Link>
    
    <p className="homePage__main-sentences">Escanea un nuevo producto.</p>
    <Link to="/restaurant-map">
    <button className="homePage__main__btn btn-grey"><img src="./Images/homesearchimgButton.png" alt="search button"/><p>Buscar</p></button></Link>
    <p className="homePage__main-sentences">Busca un comercio o restaurante para ti.</p>
    <Link to="/emergency"><button className="homePage__main__btn btn-pink"><img src="./Images/homesosimgButton.png" alt="sos button"/><p>S.O.S</p></button></Link>
    <p className="homePage__main-sentences">¿Necesitas ayuda urgente? contactamos con emergencias.</p>
    </div>
  


  <div className="homePage__navbar">
  <NavBar/>
  </div>
  
  
  </div>)
};

export default Home;
