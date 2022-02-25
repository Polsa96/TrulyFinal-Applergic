import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { JwtContext } from "../../shared/contexts/JwtContext";
import { API } from "../../shared/services/api";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const { setJwt } = useContext(JwtContext);

  const onSubmit = (formData) => {
    API.post("login", formData).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setJwt(res.data.token);
    });
  };

  return (
    <div className="Login">
      <div className="login__main">
        <div className="login__text">
          <h2>¡Bienvenido de nuevo!</h2>
          <p>Por favor, introduce tus datos para continuar.</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <label className="login__input" htmlFor="email">
            email
            <input
              type="email"
              name="email"
              placeholder="Dirección de email"
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
            />
            {errors.email && (
              <span className="login__error">
                El campo email es obligatorio
              </span>
            )}
          </label>

          <label className="login__input" htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              ref={register({
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              })}
            />
            {errors.password && (
              <span className="login__error">
                El campo contraseña es obligatorio
              </span>
            )}
          </label>

          <Link className="login__LinkForgotPassword" to="/">
            ¿Olvidaste tu contraseña?
          </Link>

          <input className="login__Button" type="submit" value="Entrar" />
        </form>

        <div className="login__footer">
          <span>¿nuevo en Applergic?</span>

          <Link className="login__ LinkRegister" to="/">
            Crea tu cuenta aquí
          </Link>
          <Link className="login__ LinkSkipRegister" to="/">
            Me registraré en otro momento
          </Link>
        </div>
      </div>
    </div>
  );
}
