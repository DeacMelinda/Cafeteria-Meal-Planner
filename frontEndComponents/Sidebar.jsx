import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./Auth";
import "./Sidebar.css";

export const Sidebar = () => {
    const auth = useAuth();
    const history = useHistory();
    return (
        <div className="sidenavs">
            <br />
            <br />
            <br />
           <img src={process.env.PUBLIC_URL + auth.user.profilePicture} alt="profilePicture" style={{ borderRadius:'50%', maxWidth:'100%', height:'auto' }} />
           <br />
           <p>{auth.user.username}</p>
           <br />
           <button type="button" onClick={(e) => {history.push('/profile/cafeterias')}}>Home</button>
           <br /> <br />
           <button type="button" onClick={(e) => {history.push('/settings')}}>Settings</button>
           <br /><br />
           <button type="button" onClick={(e) => {history.push("/favorites")}}>Favorite Cafeterias</button>
           <br /><br />
           <button type="button" onClick={(e) => {history.push("/profile")}}>View Profie</button>
           <br /> <br />
           <button type="button" onClick={(e) => {auth.logout(); history.push('/login')}}>Sign Out</button>
        </div>
    );
}