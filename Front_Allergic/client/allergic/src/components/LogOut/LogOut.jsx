import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../../shared/contexts/JwtContext";
import './LogOut.scss'


export default function LogOut () {
    const {jwt, setJwt} = useContext(JwtContext);
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        setJwt(null);
        navigate("/");
    }

    return (
        <div className="logout-container" onClick={signOut}>
        <img className="menu-items--li--img1" src="./Images/HamburguerMenuLogOut.png" alt=""/><p>Salir</p>
        </div>
    )
}
