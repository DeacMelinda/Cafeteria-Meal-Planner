import React from "react";
import "./TodayDetails.css";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth";

function TomorrowCommand ({cafeteria}) {

    const UpdateURL = "http://localhost:8081/menuitemsapi/menuItem/order/";
    const SimpleUserURL = "http://localhost:8081/simpleusersapi/simpleUser/hasSent/"

    const auth = useAuth();

    const [ disabledBut, setDisabledBut ] = useState(!auth.user.sentToday ? false : true);

    const data = cafeteria.tomorrowMenu==null?"":cafeteria.tomorrowMenu.menuItems.map(
        menuIt=> ({menuItem: menuIt.menuItem,
                  ingredients: menuIt.ingredients,
                  allergens: menuIt.allergens,
                  quantity: menuIt.quantity,
                  calories: menuIt.calories,
                  price: menuIt.price,
                  menuItemID: menuIt.menuItemID,
                  orders: menuIt.orders
                 })
    );

    const [ selection, setSelection ] = useState([]);

    const sendSelection = () => {
        for (let index = 0; index < selection.length; index++) {
            if(selection[index].menuItemID)
                axios.put(UpdateURL+selection[index].menuItemID+"/");
            
        }
        axios.put(SimpleUserURL+auth.user.username).then(res =>{});// auth.updateUser(res));
        setDisabledBut(true);
    }

    const modifySelection = (item) => {

        let sett = false;
        console.log(item);

        for (let index = 0; index < selection.length; index++) {
            let selected = selection[index];

            if (selected.menuItemID == item.menuItemID) {
                setSelection((current) =>
                    current.filter((selected) => selected.menuItemID !== item.menuItemID)
                );
                sett=true;
                break;
            }
        }

        if(!sett) {
            setSelection(selection => [...selection, item]);
        }

    }

    return(
        <div className="cont">
            <h3 style={{color:"black"}}>{cafeteria.cafeteriaName}</h3>

            <table className="tables">
                <tr>
                    <th className="th">Menu Item</th>
                    <th className="th">Ingredients</th>
                    <th className="th">Allergens</th>
                    <th className="th">Quantity</th>
                    <th className="th">Calories</th>
                    <th className="th">Price</th>
                    <th className="th">Select</th>
                </tr>
                {
                    data.map(
                        item => (
                            <tr>
                                <td className="th">{item.menuItem}</td>
                                <td className="th">{item.ingredients}</td>
                                <td className="th">{item.allergens}</td>
                                <td className="th">{item.quantity}</td>
                                <td className="th">{item.calories}</td>
                                <td className="th">{item.price}</td>
                                <td className="th"><input type="checkbox" name={item.menuItem} onChange={(e) => modifySelection(item)}/></td>
                            </tr>
                        )
                    )
                }
            </table>
            {!auth.user.sentToday && <button type="button" onClick={(e) => sendSelection(e) } hidden={disabledBut}>Submit</button>}
        </div>
    )
}

export default TomorrowCommand