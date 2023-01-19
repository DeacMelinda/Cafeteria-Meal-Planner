import "./CafeteriaMenu.css"
import TodayMenuPopUp from "./TodayMenuPopUp";
import { useState } from "react";

const TodayCafeteriaMenu = ({ cafeteria }) => {

    const [ details, setDetails ] = useState(false);

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
                {(cafeteria.todayMenu==null?"":
                cafeteria.todayMenu.menuItems.map(
                    menuItem => (
                        <li>
                            <h4>{menuItem.menuItem}</h4>
                        </li>
                    ))
                )}
            </ul>
            <br/>
            <button type="button" onClick = {()=>setDetails(true)}>View Details</button>
            <TodayMenuPopUp trigger = {details} setTrigger = {setDetails} columns={columns} cafeteria={cafeteria} />
        </div>
    )
}

export default TodayCafeteriaMenu;