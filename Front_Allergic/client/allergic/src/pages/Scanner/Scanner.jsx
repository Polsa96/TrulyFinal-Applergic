import React, { useEffect, useState } from 'react';
import { BarcodeScanner } from '../../components/BarcodeScanner/BarcodeScanner';
import QrScanner from '../../components/QrScanner/QrScanner';
import { API } from '../../shared/services/api';
import './Scanner.scss';
import Quagga from 'quagga';

const Scanner = ({props}) => {
  const [foodGET, setFoodGET] = useState([]);
  const [userAllergies, setUserAllergies] = useState([]);
  const [banderaUserAllergies, setBanderaUserAllergies] = useState(true);
  

  const [barcode, setBarcode] = useState(true)

  // useEffect(() => {
  //   API.get("api/food").then((res) => {
  //     console.log(res.data);
  //     setFoodGET(res.data);
  //   });

  //   API.get("api/users/"+JSON.parse(localStorage.getItem("id"))).then((res) => {
  //     console.log(JSON.parse(localStorage.getItem("id")));
  //     console.log(res.data.allergen);
  //     if(res.data.allergen.length>0){
  //       setUserAllergies(res.data.allergen);
  //     }else{
  //       setBanderaUserAllergies(false)
  //     }
      
  
  //   });

  // }, []);




  return <div className="scanner-container">

    {/* {foodGET.length>0 && <div>foodGET entra</div>} */}

    {/* {foodGET.length>0 && (barcode === true ? <BarcodeScanner props={foodGET,setFoodGET}/> : <QrScanner props={foodGET,setFoodGET}/>)} */}
    {(barcode === true  /*&& foodGET.length > 0 && (userAllergies.length>0 || banderaUserAllergies===false)*/) ? <BarcodeScanner props={props} /*foodGET={foodGET} userAllergies={userAllergies}*//>
     : <QrScanner foodGET={foodGET} userAllergies={userAllergies}/>}
    

    <div className="scanner-container-btn">
    <div className="scanner-container-btn--code">
    {barcode === true ? <button className="scanner-container-btn--code--blue" /*onClick={() => {setBarcode(true)}}*/><img src="./Images/scannerCodeBarWhite.png" alt="Code Bar White"/></button> 
    : <button className="scanner-container-btn--code--grey" onClick={() => {setBarcode(true)}}><img src="./Images/scannerCodeBarBlack.png" alt="Code Bar black"/></button> }
    <p>Código de Barras</p>
    </div>
    <div className="scanner-container-btn--code">
    {barcode === true ? <button className="scanner-container-btn--code--grey" onClick={() => {setBarcode(false); Quagga.stop()}}><img src="./Images/scannerCodeQrBlack.png" alt="Code Qr black"/></button> 
    : <button className="scanner-container-btn--code--blue" /*onClick={() => {setBarcode(false)}}*/><img src="./Images/scannerCodeQrWhite.png" alt="Code Qr White"/></button> }
    <p>Código QR</p>
    </div>
    </div>

  </div>;
};

export default Scanner;
