import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./Auth";
import "./CafeteriaSidebar.css";

export const CafeteriaSidebar = () => {
    const auth = useAuth();
    const history = useHistory();
    return (
        <div className="sidenav">
            
           <img src={process.env.PUBLIC_URL + auth.user.profilePicture} alt="profilePicture" style={{ borderRadius:'50%', maxWidth:'90%', height:'auto' }} />
           <br />
           <p>{auth.user.username}</p>
           <br />
           <button type="button" onClick={(e) => {history.push("/cafeteria/home")}}>Home</button>
           <br /> <br />
           <button type="button" onClick={(e) => {history.push("/settings")}}>Settings</button>
           <br /><br />
           <button type="button" onClick={(e) => {history.push("/profile")}}>View Profie</button>
           <br /><br />
           <button type="button" onClick={(e) => {auth.logout(); history.push('/login')}}>Sign Out</button>
        </div>
    );
}