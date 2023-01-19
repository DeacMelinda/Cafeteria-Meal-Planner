import React from "react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { TomorrowMenuItems } from "../TomorrowMenuItems";

const menuItemsURL = "http://localhost:8081/menuitemsapi/menuItems";

export const TomorrowMenuItemsHook = (props) => {    

    const [ data, setData ] = useState({menuItems: [], isFetching: false});
    
    useEffect(() => {
        const getMenuItems = async () => {
            try {
                setData((data) => ({menuItems: data.menuItems, isFetching: true}));
                const response = await axios.get(menuItemsURL);
                setData({menuItems: response.data, isFetching: false});
            } catch(e) {
                console.log(e);
                setData((data) => ({menuItems: data.menuItems, isFetching: false}));
            }
        };
        getMenuItems();
    }, [] );

    return <TomorrowMenuItems data={data.menuItems} isFetching={data.isFetching} writeOn={props.writeOn} setWriteOn={props.setWriteOn}/>;
    
}

