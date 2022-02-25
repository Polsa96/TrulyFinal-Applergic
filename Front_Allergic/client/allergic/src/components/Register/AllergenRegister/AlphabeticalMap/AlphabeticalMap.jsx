import React from "react";
import "./AlphabeticalMap.scss";

const AlphabeticalMap = ({ allergens, letter, register }) => {
  return (
    <div className="alphabetical--container">
      <div className="alphabetical--container--letter">
        <h1>{letter}</h1>
      </div>
      <div className="alphabetical--container--allergens">
        {allergens.map((allergen) => (
          <div className="alphabetical--container--allergens--group" key={allergen._id}>
            {allergen.name[0].toUpperCase() === letter && (
              <div className="alphabetical--container--allergens--group--inputs">
                <input
                  type="checkbox"
                  value={allergen._id}
                  {...register("allergens")}
                  
                  id={allergen.name}
                />
                <label htmlFor={allergen.name}>{allergen.name}</label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlphabeticalMap;
