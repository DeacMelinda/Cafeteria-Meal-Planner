import React from "react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { MenuItemsTable } from "./MenuItemsTable";
    
const menuItemsGetURL = "http://localhost:8081/menuitemsapi/menuItems";

export const MenuItemsTableHook = () => {    

    const [ data, setData ] = useState({menuItems: [], isFetching: false});
    
    useEffect(() => {
        const getMenuItems = async () => {
            try {
                setData((data) => ({menuItems: data.menuItems, isFetching: true}));
                const response = await axios.get(menuItemsGetURL);
                setData({menuItems: response.data, isFetching: false});
            } catch(e) {
                console.log(e);
                setData((data) => ({menuItems: data.menuItems, isFetching: false}));
            }
        };
        getMenuItems();
    }, [] );

    return <MenuItemsTable data={data.menuItems} setData={setData} isFetching={data.isFetching}/>;
    
}

