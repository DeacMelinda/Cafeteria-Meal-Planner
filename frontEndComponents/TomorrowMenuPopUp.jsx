import imag from "./exit.png";
import React from "react";
import "./PopUp.css";
import TomorrowCommand from "./TomorrowCommand";

export default function TomorrowMenuPopUp(props) {

    return (props.trigger) ? (
        <div className='popup'>
          <div className="popup-inner">
            <button className='close-btn' onClick={()=>props.setTrigger(false)}><img className='imag' src={imag}/></button>
            <TomorrowCommand cafeteria = {props.cafeteria} />
            
          </div>
        </div>
       ) : "";

}

