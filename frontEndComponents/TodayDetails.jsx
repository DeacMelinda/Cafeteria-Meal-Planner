import React from "react";
import "./TodayDetails.css";
import imag from "./exit.png";

function TodayDetails ({cafeteria, ...props}) {

    const data = cafeteria.todayMenu==null?"":cafeteria.todayMenu.menuItems.map(
        menuIt=> ({menuItem: menuIt.menuItem,
                  ingredients: menuIt.ingredients,
                  allergens: menuIt.allergens,
                  quantity: menuIt.quantity,
                  calories: menuIt.calories,
                  price: menuIt.price
                 })
    );

    return(
        <div className="cont">
            <table className="tables">
                <tr>
                    <th className="th">Menu Item</th>
                    <th className="th">Ingredients</th>
                    <th className="th">Allergens</th>
                    <th className="th">Quantity</th>
                    <th className="th">Calories</th>
                    <th className="th">Price</th>
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
                            </tr>
                        )
                    )
                }
            </table>

        </div>
            
    )
}

export default TodayDetails