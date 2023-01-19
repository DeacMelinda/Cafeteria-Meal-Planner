import React from "react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "./components/Auth";
import GridCafeterias from "./components/GridCafeterias";

export const GridFavoriteCafeteriasHooks = () => {    

    const auth = useAuth();
    
    const [ data, setData ] = useState({cafeterias: [], isFetching: false});
    
    useEffect(() => {
        const getCafeterias = async () => {
            console.log(auth.user);
            const uniqueIds = [];
            const uniqueCafeterias = auth.user.subscriptions.filter(element => {
                const isDuplicate = uniqueIds.includes(element.username);
            
                if (!isDuplicate) {
                  uniqueIds.push(element.username);
            
                  return true;
                }
            
                return false;
              });
                setData({cafeterias: uniqueCafeterias, isFetching: false});

        };
        getCafeterias();
    }, [] );

    return <GridCafeterias data={data.cafeterias} isFetching={data.isFetching}/>;
    
}

