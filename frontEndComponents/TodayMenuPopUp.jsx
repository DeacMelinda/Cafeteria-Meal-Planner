import imag from "./exit.png";
import React from "react";
import "./PopUp.css";
import TodayDetails from "./TodayDetails";

export default function TodayMenuPopUp(props) {

    return (props.trigger) ? (
        <div className='popup'>
          <div className="popup-inner">
            <button className='close-btn' onClick={()=>props.setTrigger(false)}><img className='imag' src={imag}/></button>
            <br />
            <br />
            <TodayDetails cafeteria = {props.cafeteria} />
            
          </div>
        </div>
       ) : "";

}

