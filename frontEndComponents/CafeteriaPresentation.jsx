import React from "react";
import { useState } from "react";
import starOutline from "./starOutline.png";
import star from "./star.png";
import "./CafeteriaPresentation.css";
import { useAuth } from "./Auth";
import axios from "axios";

export const CafeteriaPresentation = ({cafeteria, index}) => {

    const ADD_SUBS_URL = "http://localhost:8081/simpleusersapi/simpleUser/subs/";
    const REMOVE_SUBS_URL = "http://localhost:8081/simpleusersapi/simpleUser/subsrem/";

    const auth = useAuth();

    const [selectedPicture, setSelectedPicture] = useState(auth.user.subscriptions.some(item => item.username == cafeteria.username) ? star : starOutline);

    const buttonClicked = () => {
        console.log(index);
        if (selectedPicture == starOutline) {
            setSelectedPicture(star);
            axios.put(ADD_SUBS_URL+auth.user.username, cafeteria);
        }
        else {
            setSelectedPicture(starOutline);
            axios.put(REMOVE_SUBS_URL+auth.user.username, cafeteria);
        }
    }
    return (
        <div className="caf">
            <div className="picture-div">
                <img src ={process.env.PUBLIC_URL + cafeteria.profilePicture} alt="Pic" style={{ width:"90px", height:'90px', position: "absolute", top: "4px", left: "4px" }}/> 
            </div>
            <div className="details-div">
                <button type="button" className="buton"  onClick={buttonClicked}><img src={selectedPicture} alt="my image" className="imaginea" /></button>
                <h3 style={{top:"4px"}}>{cafeteria.cafeteriaName}</h3>
                <h5>{cafeteria.address}</h5>
                <h4>{cafeteria.program}</h4>
                <p>{cafeteria.description}</p>
            </div>

        </div>
    );

}