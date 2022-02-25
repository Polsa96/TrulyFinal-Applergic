import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { BarcodeScanner } from '../../components/BarcodeScanner/BarcodeScanner';
import { ProductContext } from '../../shared/contexts/ProductContext';
import { API } from '../../shared/services/api';
import "./ResultScanner.scss";



const ResultScanner = ({props}) => {
  // const {product, setProduct}=useContext(ProductContext);                 //esta variable muestra el codigo de barras escaneado

  const [foodGET, setFoodGET] = useState([]);                             //esta variable recoge todos los productos en la base de datos
  const [userAllergies, setUserAllergies] = useState([]);                 //esta variable recoge todas las alergias del usuario
  const [isAllergic, setIsAllergic] = useState(0);                       //esta variable recoge las alergías que coinciden
  const [banderaUserAllergies, setBanderaUserAllergies] = useState(true); //esta bandera nos indica si no tiene ninguna alergia
  const [banderaProductoDesconocido, setBanderaProductoDesconocido] = useState(true); //que el barcode no coincide con product
  const [foodElected, setFoodElected] = useState({});                     //esta variable recoge el producto escaneado
  
  const navigate = useNavigate();
  // let banderaProductoDesconocido=true;
  // console.log("Productos Rick",props.product);
  // console.log("hola");

  useEffect(() => {
    
    
        API.get("api/food").then((res) => {
          // console.log(res.data);
          setFoodGET(res.data);
        });
      
      API.get("api/users/"+JSON.parse(localStorage.getItem("id"))).then((res) => {
          // console.log(JSON.parse(localStorage.getItem("id")));
          // console.log(res.data);
          if(res.data.allergen.length>0){
            setUserAllergies(res.data.allergen);
          }else{
            setBanderaUserAllergies(false)
          }
        });
  console.log("UseEffect 1")
  },[])   

  useEffect(()=>{
    // if(banderaProductoDesconocido===true){
    for (let i=0; i<foodGET.length; i++){                                                //Este FOR  recorre toda la comida de la base de datos
          let foodCompare=foodGET[i]
          // console.log("estoy dentrooooo")
      
            if(foodCompare.barcode.toString().includes(props.product.code.codeResult.code)){      //Este IF compara el codigo de barras de la base de datos con el codigo de barras que escaneamos
              setBanderaProductoDesconocido(false);
                // console.log('EUREKA')
                // console.log('Comida elegida',foodCompare)
                setFoodElected(foodCompare);                                                //Guardamos el producto en una variable de estado
                //Aquí comparamos las alergias
                if(userAllergies.length>0){                                                 //Este IF se encara de consultar si el usuario tiene alguna alergia
      
                    for (const allergen of foodCompare.allergen) {                          //Este FOR recorre los alergenos de la comida de la base de datos
                        if(userAllergies.includes(allergen._id)){                           //Este IF compara las alergias del usuario con los alergenos de la comida
                            // console.log('Bro, eres alergico')
                            setIsAllergic(isAllergic+1)
                            break
                        }else{
                            // console.log('no eres alergico')
                        }
                        
                    }
                    //Aquí comparamos las trazas
                    for (const trace of foodCompare.traces) {                               //Este FOR recorre las trazas de la comida de la base de datos
                        if(userAllergies.includes(trace._id)){                              //Este IF compara las alergias del usuario con las trazas de la comida
                            // console.log('Bro, eres tracetico')
                            setIsAllergic(isAllergic+1)
                            break
                        }else{
                            // console.log('no eres tracetico')
                        }
                        
                    }
                }else{
                    // console.log('NO TIENES ALERGIAS')
                }
            }
       
    // }
    // if(banderaProductoDesconocido===true){
    //   console.log('Producto desconocido');
    // }
    
  }
  // console.log("UseEffect 2");
  }, [foodGET, userAllergies,banderaUserAllergies]);

  
// console.log("aaaaaaaaaaaaaaaaaaaaaa", foodElected);
// console.log("bbbbbbb:",banderaProductoDesconocido);


  const patchFavorites = ()=>{
    API.patch("api/users/patch/"+JSON.parse(localStorage.getItem("id")), {fav:[foodElected._id]}).then((res) => {
      console.log(res);
      // console.log("HE ENVIADO LA PETICIONNNNNNN")
     
    });
  }



  return (
  <div className="resultscanner">
  {foodGET.length>0 && (userAllergies.length>0 || !banderaUserAllergies) ? (
    <div clasName="resultscanner--container">
      <div className='resultscanner--container--page'>
        <Link to="/scanner"><img src="./Images/returnBackImage.png" alt="Back Icon"/><p>Volver</p></Link>
        <Link to="/"><img src="./Images/barcodeLeaveImg.png" alt="Cruz"/></Link>
      </div>
      <div className='resultscanner--container--main'>
        <h2>Aquí tienes el resultado.</h2>

        {userAllergies.length>0 && isAllergic>0 ? <p>Este producto <span>NO</span> es apto para ti</p>
          : (banderaProductoDesconocido===true ? <p>Lo sentimos, no hay datos suficientes para poder valorar este producto.</p> 
          : <p>Este producto es apto para ti.</p>) }
        
          
        {/* {banderaProductoDesconocido===false && isAllergic ? <div className='resultscanner--container--main--description'><div className={isAllergic >0 ? "resultscanner--container--main--description--image red" : "resultscanner--container--main--description--image green"} ><img src={foodElected.img} alt="producto"/></div> <h3>{foodElected.name}</h3> <p><span>Ingredientes:</span> {foodElected.ingredients}</p> </div> */}
        {banderaProductoDesconocido===false && isAllergic===0 ? <div className='resultscanner--container--main--description'>
                      <div className= "resultscanner--container--main--description--image green" >
                            <img src={foodElected.img} alt="producto"/>
                            <div className="green--sign"><img src="./Images/ScannerResultCheck.png" alt="Check Image"/></div>
                            <div className="resultscanner--container--main--description--image--save">
                              <button onClick={() => patchFavorites()}><img src="./Images/navBarIconStar.png" alt=""/></button>
                              <button><img src="./Images/navBarIconDiary.png" alt=""/></button>
                              <button><img src="./Images/navBarIconShared.png" alt=""/></button>
                            </div>
                      </div> 
                      <h3>{foodElected.name}</h3> 
                      <p><span>Ingredientes:</span> {foodElected.ingredients}</p> 
                      </div>
        : (banderaProductoDesconocido===false && isAllergic>0 ? <div className='resultscanner--container--main--description'>
                      <div className="resultscanner--container--main--description--image red" >
                            <img src={foodElected.img} alt="producto"/>
                            <div className="red--sign"><img src="./Images/ScannerResultCross.png" alt="Cross Image"/></div>
                            <div className="resultscanner--container--main--description--image--save">
                              <button onClick={() => patchFavorites()}><img src="./Images/navBarIconStar.png" alt=""/></button>
                              <button><img src="./Images/navBarIconDiary.png" alt=""/></button>
                              <button><img src="./Images/navBarIconShared.png" alt=""/></button>
                            </div>
                      
                      </div> 
                      <h3>{foodElected.name}</h3> 
                      <p><span>Ingredientes:</span> {foodElected.ingredients}</p> </div>
        : <div className='resultscanner--container--main--description'>
                      <div className='resultscanner--container--main--description--image orange'>
                            <img src="https://alemautos.com.co/themes/kol3-cars/assets/images/no-image.png" alt="No image"/>
                            <div className="orange--sign"><img src="./Images/ScannerResultQuestionMark.png" alt="Question Mark Image"/></div>
                      </div>
                      <p>No se conocen los ingredientes que conforman este alimento</p>
          </div>)}
          
        <button        
              className="resultscanner--container--main--button"
              onClick={() => navigate("/scanner")}
            >
              Escanear otro producto
        </button>
        

      </div>

    </div>
    ):
    <div></div>

    

  }

      
  </div>
  )
};

export default ResultScanner;
