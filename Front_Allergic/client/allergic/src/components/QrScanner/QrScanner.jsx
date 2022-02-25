import React from 'react';
import QrReader from 'react-qr-scanner'
import { Link } from 'react-router-dom';
import './QrScanner.scss'

const previewStyle = {
    
    
}

const QrScanner = ({props}) => {

    const successScan = (data) => {
        if (data) {
            console.log(data);
        }
    }


    const errorScan = (err) => {
        console.log(err);
    }


  return(<div className="c-qr-scanner">

  <div className="c-qr-scanner-leave">
    <Link to="/" ><img src="./Images/barcodeLeaveImg.png" alt="Leave Icon"/></Link> 
  </div>

  <div className="c-qr-scanner-title">
  <h2>Escaneando...</h2>

  <h6>Tan solo tienes que centrar el <span>QR</span> del producto en el recuadro.</h6>

  </div>
  
  <div className="c-qr-scanner--video">

  <QrReader
    style={previewStyle}
    onError={errorScan}
    onScan={successScan}

  />
  
  </div>

  


  </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

  )


};

export default QrScanner;
