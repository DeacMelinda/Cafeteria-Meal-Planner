import React from "react";
import "./MainCafeterias.css";
import { useHistory } from "react-router-dom";

export const MainCafeterias = () => {
    const history = useHistory();

    return (
        <div className="container-main">
            <button onClick={() => history.push("/cafeteria/today")}>Today's Menu</button>
            <br />
            <button onClick={() => history.push("/cafeteria/tomorrow")}>Tomorrow's Options</button>
            <br />
            <button onClick={() => history.push("/cafeteria/menuItems")}>Menu Items</button>
            <br />
            <button onClick={() => history.push("/login")}>Sign Out</button>
        </div>
        
    );
}