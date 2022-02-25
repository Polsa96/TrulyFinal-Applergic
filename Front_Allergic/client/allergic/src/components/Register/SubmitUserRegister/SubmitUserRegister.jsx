import React, { useEffect, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { API } from "../../../shared/services/api";
import "./SubmitUserRegister.scss";

const SubmitUserRegister = ({ props, props2 }) => {
  console.log(props.finalInfo);
  const [allergensGET, setAllergensGET] = useState([]);
  const allergensFinded = [];

  const navigate = useNavigate();
 

  let finalInfoRegister = {
    name: "",
    email: "",
    phone: "",
    password: "",
    contact: {
      sosname: "",
      sosemail: "",
      sosphone: "",
      assurance: "",
    },
    //  allergen=[]
  };

  useEffect(() => {
    API.get("api/allergen").then((res) => {
      setAllergensGET(res.data);
    });
  }, []);

  

  //En este componente se realiza una petición a la API para traer el array de alergenos
  //de forma que ya el usuario ha seleccionado previamente sus alergías y las hemos
  //traido por props.finalInfo.
  //Después, se realiza un IF en la linea27 por si el usuario no elige ninguna alergía
  //previamente.
  //Dentro de la condición, se realiza un FOR para recorrer todas las alergías elegidas
  //por el usuario y concatena otro FOR para recorrer todas las alergías que hay
  //en la base de datos.
  //Y en el caso que coincidan lo guarda al array creado allergensFinded[].
  //Una vez realizado esto, se procede a ejecutar este array en el return de la función.
  //En el return se hace un mapeo para pintar las alergías del usuario.

  if (
    allergensGET.length > 0 &&
    props.finalInfo.allergenObject.allergens !== false
  ) {
    for (let i = 0; i < props.finalInfo.allergenObject.allergens.length; i++) {
      let allergenElected = props.finalInfo.allergenObject.allergens[i];

      for (let j = 0; j < allergensGET.length; j++) {
        let allergenGET = allergensGET[j];

        if (allergenGET._id === allergenElected) {
          allergensFinded.push(allergenGET);
        }
      }
    }
  }

  finalInfoRegister.name = props.finalInfo.name;
  finalInfoRegister.email = props.finalInfo.email;
  finalInfoRegister.phone = props.finalInfo.phone;
  finalInfoRegister.password = props.finalInfo.password;
  finalInfoRegister.contact.sosname = props.finalInfo.contact.sosname;
  finalInfoRegister.contact.sosemail = props.finalInfo.contact.sosemail;
  finalInfoRegister.contact.sosphone = props.finalInfo.contact.sosphone;
  finalInfoRegister.contact.assurance = props.finalInfo.contact.assurance;
  if (props.finalInfo.allergenObject.allergens !== false) {
    finalInfoRegister = { ...finalInfoRegister, allergen: allergensFinded };
  }

  // console.log("ConsoleLog normal", finalInfoRegister);

  const onSubmit = () => {
    API.post("api/users/register", finalInfoRegister).then((res) => {
      console.log("Register user", res);
    });
    navigate("/")
  };

  return (
    <div className="submit-register-container">
      <div className="submit-register-container--page">
        <Link to="/">
          <img src="./Images/registerCrossImage.png" alt="Cross Icon" />
        </Link>
      </div>
      <div className="submit-register-container--text">
        <h1>Confirma tu selección.</h1>
        <p>
          A continuación te resumimos los alimentos registrados como peligrosos
          para ti.
        </p>
      </div>
      <div className="submit-register-container--parrafo">
        <p>Marca para deseleccionar o añadir uno nuevo.</p>
      </div>

      <div className="submit-register-container--allergens">
        {allergensFinded.map((allergenFinded) => (
          <div
            className="submit-register-container--allergens--checkbox"
            key={allergenFinded._id}
          >
            <input
              type="checkbox"
              value={allergenFinded.name}
              defaultChecked={true}
              id={allergenFinded.name}
            />
            <label htmlFor={allergenFinded.name}> {allergenFinded.name}</label>
          </div>
        ))}
      </div>
      <div className="submit-register-container--button">
        <button
          className="submit-register-container--button--back"
          onClick={() => props2.setPage(3)}
        >
          Añadir nuevos
        </button>
        <button        
          className="submit-register-container--button--submit"
          onClick={() => onSubmit()}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default SubmitUserRegister;
