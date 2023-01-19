import React from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { GridFavoriteCafeteriasHooks } from "./GridFavoriteCafeteriasHooks";

export const FavoriteCafeterias = () => {
    return (
        <div className="divMare" >
        <div><Navbar/></div>
        <div style={{position:'absolute', left:'10%', width:"1200px", top:'10%'}}>
            <GridFavoriteCafeteriasHooks />
        </div>
        <div><Sidebar/></div>
        </div>
    )
}