import "./CafeteriaMenu.css"
import TomorrowMenuPopUp from "./TomorrowMenuPopUp";
import { useState } from "react";

const TomorrowCafeteriaMenu = ({ cafeteria }) => {

    const [ command, setCommand ] = useState(false);

    const columns = [{
        Header:'Menu Item',
        accessor: 'menuItem'
    },{
        Header:'Ingredients',
        accessor: 'ingredients'
    },{
        Header:'Allergens',
        accessor: 'allergens'
    },{
        Header:'Quantity',
        accessor:'quantity'
    },{
        Header:'Calories',
        accessor:'calories'
    },{
        Header:'Price',
        accessor:'price'
    }];

    return (
        <div className="cafeteriaCard">
            
            <h2>{cafeteria.cafeteriaName}</h2>
            <br/>
            <ul>
                {(cafeteria.tomorrowMenu==null?"":
                cafeteria.tomorrowMenu.menuItems.map(
                    menuItem => (
                        <li>
                            <h4>{menuItem.menuItem}</h4>
                        </li>
                    ))
                )}
            </ul>
            <br/>
            {cafeteria.tomorrowMenu && <button type="button" onClick={() => setCommand(true)}>View Details</button>}
            <TomorrowMenuPopUp trigger = {command} setTrigger = {setCommand} columns = {columns} cafeteria={cafeteria} />
        </div>
    )
}

export default TomorrowCafeteriaMenu;