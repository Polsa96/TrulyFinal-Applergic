import React from "react";
import { useForm } from "react-hook-form";
import "./UserRegister.scss";
import {Link} from 'react-router-dom'

const UserRegister = ({ props, props2 }) => {
  const { register, handleSubmit } = useForm();

  // const onSubmit = (formData) => {
  //   API.post("/api/users/register", formData).then((res) => {
  //     console.log("Register user", res);
  //     console.log("formData =", formData)

  //   });

  // };

  const onSubmit = (formData) => {
    props.setFinalInfo(formData);
    
    setTimeout(()=>{
      props2.setPage(2)
    },300)
  };

  return (
    <div className='user-register-container'>
    <div className='user-register-container--page'>
      <Link to="/"><img src="./Images/returnBackImage.png" alt="Back Icon"/>Volver</Link>
      <p>{props2.page} de 4</p>
    </div>
    <div className='user-register-container--image'>
      <h1>Dinos quien eres.</h1>
      <div className='user-register-container--image--profile'>
        <img src="./Images/registerCameraImage.png" alt="Camera Icon"/>
        <p>Subir foto</p>
      </div>
      
    </div>
      <form className='user-register-container--form' onSubmit={handleSubmit(onSubmit)}>

        <input className='user-register-container--form--input'
          id="name"
          // defaultValue="Recardo"
          placeholder="Nombre completo"
          type="name"
          {...register("name", { required: true })}
        />

        <input className='user-register-container--form--input'
          id="email"
          // defaultValue="ricardo@gmail.com"
          placeholder="Dirección e-mail"
          type="email"
          {...register("email", {
            required: true,
          })}
        />

        <input className='user-register-container--form--input'
          id="phone"
          // defaultValue="666666666"
          placeholder="Móvil"
          type="number"
          {...register("phone", {
            required: true
          })}
        />

        <input className='user-register-container--form--input'
          name="password"
          id="password"
          type="password"
          // defaultValue="Cortina123*"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />

        <input className='user-register-container--form--button' type="submit" value="Guardar Perfil" />
      </form>
    </div>
  );
};

export default UserRegister;
