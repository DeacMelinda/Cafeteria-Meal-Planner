import React from "react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TodayCarousel from "./TodayCarousel";

const CAFETERIA_GET_URL = "http://localhost:8081/cafeteriausersapi/cafeteriaUsers/";

export const CafeteriasTodayCarouselHook = ({today}) => {    

    const [ data, setData ] = useState({cafeterias: [], isFetching: false});
    
    useEffect(() => {
        const getCafeterias = async () => {
            try {
                setData((data) => ({cafeterias: data.cafeterias, isFetching: true}));
                const response = await axios.get(CAFETERIA_GET_URL);
                setData({cafeterias: response.data, isFetching: false});
            } catch(e) {
                console.log(e);
                setData((data) => ({cafeterias: data.cafeterias, isFetching: false}));
            }
        };
        getCafeterias();
    }, [] );

    return <TodayCarousel data={data.cafeterias} isFetching={data.isFetching}/>;
    
}

