import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../../shared/services/api";
import AlphabeticalMap from "./AlphabeticalMap/AlphabeticalMap";
import "./AllergenRegister.scss";

const AllergenRegister = ({ props, props2 }) => {
  // const [allergensLetter, setAllergenLetter] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = (allergenObject) => {
    // console.log(allergenObject);
    // const hello = formData
    // console.log(hello)
    props.setFinalInfo({ ...props.finalInfo, allergenObject });
    props2.setPage(4);
  };

  useEffect(() => {
    API.get("/api/allergen").then((res) => {
      const allergenslocal = res.data;

      allergenslocal.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      setAllergens(allergenslocal);
    });
  }, []);

  const allergensLetter = [];
  if (allergens.length > 0 && allergensLetter.length === 0) {
    for (let i = 0; i < allergens.length; i++) {
      let allergen = allergens[i];
      if (!allergensLetter.includes(allergen.name[0].toUpperCase())) {
        allergensLetter.push(allergen.name[0].toUpperCase());
      }
    }
    console.log(allergensLetter);
  }

  return (
    <div className="allergen-register-container">
      <div className="allergen-register-container--page">
        <h4 onClick={() => props2.setPage(2)}>
          <img src="./Images/returnBackImage.png" alt="Back Icon" />
          Volver
        </h4>
        <p>{props2.page} de 4</p>
      </div>
      <div className="allergen-register-container--text">
        <h1>Ahora selecciona tus alergias e intolerancias.</h1>
        <p>
          Los elementos marcados serán identificados en tus busquedas como
          peligrosos para ti.
        </p>
      </div>

      <div className="allergen-register-container--letters">
        {allergensLetter.map((allergenLetter) => (
          <div className="allergen-register-container--letters--unique" key={allergenLetter}>
            <a href={`#${allergenLetter}`}>{allergenLetter}</a>
          </div>
        ))}
      </div>

      
        {allergens.length > 0 && (
          
            <form className="allergen-register-container--form" onSubmit={handleSubmit(onSubmit)}>
              <div id="A">
              <AlphabeticalMap
                allergens={allergens}
                letter={"A"}
                register={register}
      
                
              />
              </div>
              <div id="C">
              <AlphabeticalMap
                allergens={allergens}
                letter={"C"}
                register={register}
              />
              </div>
              <div id="F">
              <AlphabeticalMap
                allergens={allergens}
                letter={"F"}
                register={register}
              />
              </div>
              <div id="G">
              <AlphabeticalMap
                allergens={allergens}
                letter={"G"}
                register={register}
              />
              </div>
              <div id="H">
              <AlphabeticalMap
                allergens={allergens}
                letter={"H"}
                register={register}
              />
              </div>
              <div id="K">
              <AlphabeticalMap
                allergens={allergens}
                letter={"K"}
                register={register}
              />
              </div>
              <div id="L">
              <AlphabeticalMap
                allergens={allergens}
                letter={"L"}
                register={register}
              />
              </div>
              <div id="M">
              <AlphabeticalMap
                allergens={allergens}
                letter={"M"}
                register={register}
              />
              </div>
              <div id="N">
              <AlphabeticalMap
                allergens={allergens}
                letter={"N"}
                register={register}
              />
              </div>
              <div id="P">
              <AlphabeticalMap
                allergens={allergens}
                letter={"P"}
                register={register}
              />
              </div>
              <div id="R">
              <AlphabeticalMap
                allergens={allergens}
                letter={"R"}
                register={register}
              />
              </div>
              <div id="S">
              <AlphabeticalMap
                allergens={allergens}
                letter={"S"}
                register={register}
              />
              </div>
              <div id="T">
              <AlphabeticalMap
                allergens={allergens}
                letter={"T"}
                register={register}
              />
              </div>
              <div id="U">
              <AlphabeticalMap
                allergens={allergens}
                letter={"U"}
                register={register}
              />
              </div>
              <div id="V">
              <AlphabeticalMap
                allergens={allergens}
                letter={"V"}
                register={register}
              />
              </div>
              <div id="Y">
              <AlphabeticalMap
                allergens={allergens}
                letter={"Y"}
                register={register}
                
              />
              </div>
              <input className="allergen-register-container--form--button"type="submit" value="Guardar" />
            </form>
          
        )}
      
    </div>
  );
};

export default AllergenRegister;
