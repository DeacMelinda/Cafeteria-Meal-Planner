import React from 'react';
import { useHistory } from "react-router-dom";
import { CafeteriaSidebar } from './components/CafeteriaSidebar';
import "./App.css";
import './TodayCafeteria.css';
import { TodayMenuCard } from './TodayMenuCard';
import { TodayCafeteriaAnalysis } from './components/TodayCafeteriaAnalysis';

export const TodayCaf = () => {
    const history = useHistory();

    return (
        <div>
            
            <button style={{border:"none", background:"transparent", left:"4px", top:"4px", position:"absolute"}} onClick={() => history.push("/cafeteria/home")}><img src={process.env.PUBLIC_URL + "/home.png"} style={{width:"40px", height:"40px"}}/></button>
            
            <div><TodayMenuCard /></div>
            <div><TodayCafeteriaAnalysis /></div>

            <CafeteriaSidebar/>
        </div>
    );
};
