import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate} from "react-router-dom";
import './LoginPage.scss';
import LogOut from "../../components/LogOut/LogOut";

import { JwtContext } from "../../shared/contexts/JwtContext";
import { API } from "../../shared/services/api";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { jwt, setJwt } = useContext(JwtContext);

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    API.post("api/users/login", formData).then((res) => {
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("id", JSON.stringify(res.data.id));
     
      setJwt(res.data.token);
      setTimeout(()=>{
    
        navigate("/home")
        console.log('estoy dentro')
      },300)
    });
  };

  return (
  <div className="login">

    {/* <LogOut/> */}
    <div className="login--container">
    <img src='./Images/StartLoginImage.png' alt='Imagen Login'/>
    </div>

    <div className="login--container--wellcome">
      <h1>¡Bienvenido de nuevo!</h1>
      <p>Por favor, introduce tus datos para continuar.</p>
    </div>
    

    <form className="login--container--form" onSubmit={handleSubmit(onSubmit)}>
      <input className="login--container--form--input"
        id="email"
        placeholder="Dirección e-mail"
        // defaultValue="ricardo@gmail.com"
        {...register("email", { required: true })}
      />

   
      <input className="login--container--form--input"
        id="password"
        type="password"
        placeholder="Password"
        // defaultValue="Cortina123*"
        {...register("password", {
          required: true,
        })}
      />

      <p>¿Olvidaste tu contraseña?</p>

      <input className="login--container--form--button" type="submit" value="Entrar" />
    </form>

    <div className="login--container--redirect">

      <h3>¿nuevo en Applergic?</h3>
      <Link to="/registerpage">Crea tu cuenta aquí</Link>
      <p>Me registraré en otro momento</p>

    </div>

    </div>
  );
};

export default LoginPage;
