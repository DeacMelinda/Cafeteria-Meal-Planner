import React from "react";
import "./components/TomorrowMenuItems.css";
import "./TodayCafeteria.css";
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from "react";
import { useAuth } from "./components/Auth";
import axios from "axios";

export const TomorrowMenuItems = (props) => {

    const current = new Date();
    
    const [ disabledBut, setDisabledBut ] = useState(false);

    let tomorrow =  new Date()
    tomorrow.setDate(current.getDate() + 1)

    const date = `${tomorrow.getDate()}/${tomorrow.getMonth()+1}/${tomorrow.getFullYear()}`;

    const auth = useAuth();

    const updateTomorrowURL = "http://localhost:8081/cafeteriausersapi/cafeteriaUser/tomorrowMenu/"+auth.user.username;
    const generateMenuURL = "http://localhost:8081/menuapi/menu";
    const getMenuURL = "http://localhost:8081/menuapi/menus/";

    const [selection, setSelection] = useState([]);

    const updateCafeteria = () => {
        axios.post(generateMenuURL, {"menuTitle": auth.user.username+date, "menuItems": selection}).then(res => (
            axios.get(getMenuURL+res.data.menuID).then(res1 => 
                axios.put(updateTomorrowURL, res1.data))));

        // axios.put(updateTomorrowURL, {"menuTitle": auth.user.username+date, "menuItems": selection});
    }

    const updateSelection = (item) => {
        var found = false;
        for(let i = 0; i < selection.length; i++) {
            if(selection[i] == item) {
                setSelection(
                    selection.filter(a =>
                      a.menuItemID !== item.menuItemID
                    )
                  );
                found = true;
                break;
            }
            props.setWriteOn(selection);
        }

        if(!found) {
            setSelection([
                ...selection,
                item
              ]);
              props.setWriteOn(selection);
        }

        props.setWriteOn(selection);
        
    }

    return (
        <div className="selection">
        <div>
            <table>
                <tr>
                    <th>Menu Item</th>
                    <th>Select</th>
                </tr>
                {
                    props.data.map(
                        item => (
                            <tr>
                                <td>
                                <Tooltip title={
                                    <p>
                                    <b>Ingredients: </b>{item.ingredients}
                                    <br/>
                                    <b>Allergens: </b>{item.allergens}
                                    <br/>
                                    <b>Calories: </b>{item.calories}
                                    </p>
                                }>
                                <p>{item.menuItem}</p>
                                </Tooltip>
                                </td>
                                <td><input type="checkbox" onChange={(e) => updateSelection(item)}/></td>
                            </tr>
                        )
                    )
                }
            </table>
        </div>
        <button className="submit" type="button" onClick={(e) => {updateCafeteria(); setDisabledBut(true);}} disabled={disabledBut} hidden={disabledBut}>Submit!</button>
        </div>

    );
}