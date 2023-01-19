import React from "react";
import './SimpleUserInterface.css';
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { GridCafeteriasHooks } from "./components/GridCafeteriasHooks";

export const SimpleUserInterface = () => {

    return (
        <div className="divMare" >
        <div><Navbar/></div>
        <div style={{position:'absolute', left:'10%', width:"1200px", top:'10%'}}>
            <GridCafeteriasHooks />
        </div>
        <div><Sidebar/></div>
        </div>
        
    );
}