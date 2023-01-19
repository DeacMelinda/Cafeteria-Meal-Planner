import axios from "axios";
import React from "react";
import { useState } from "react";
import imag from "./exit.png";
import "./AddNewMenuItem.css";

export const AddNewMenuItem = (props) => {

    const createURL = "http://localhost:8081/menuitemsapi/menuItem";

    const [ menuItem, setMenuItem ] = useState("");
    const [ ingredients, setIngredients ] = useState("");
    const [ allergens, setAllergens ] = useState("");
    const [ quantity, setQuantity ] = useState();
    const [ calories, setCalories ] = useState();
    const [ price, setPrice ] = useState();

    const handleSubmit = () => {
        axios.post(createURL, {
            menuItem,
            ingredients,
            allergens,
            quantity,
            calories,
            price
        }).then(res => console.log('Posting data2', res)).catch(err => console.log(err));
        props.setRerender(true);
        props.setTrigger(false);
    }

    return (props.trigger) ?
    (

        <div className="popup">
            <div className="popup-inner">
            <button className='close-btn' onClick={()=>props.setTrigger(false)}><img className='imag' src={imag}/></button>
            <form className="menu-items-form" onSubmit={handleSubmit}>
            <label htmlFor="menuItem">Menu Item</label>
            <br />
            <input
                value = {menuItem}
                type="menuItem"
                placeholder="menu item name"
                id="menuItem"
                name="menuItem"
                onChange={(e) => setMenuItem(e.target.value)}
            />
            <br />
            <label htmlFor="ingredients">Ingredients</label>
            <br />
            <input
                value = {ingredients}
                type="ingredients"
                placeholder="ingr1, ingr2, ..."
                id="ingredients"
                name="ingredients"
                onChange={(e) => setIngredients(e.target.value)}
            />
            <br />

            <label htmlFor="allergens">Allergens</label>
            <br />
            <input
                value = {allergens}
                type="allergens"
                placeholder="alleren1, allergen2, .. or -"
                id="allergens"
                name="allergens"
                onChange={(e) => setAllergens(e.target.value)}
            />
            <br />

            <label htmlFor="calories">Calories</label>
            <br />
            <input
                value = {calories}
                type="calories"
                placeholder="10.2"
                id="calories"
                name="calories"
                onChange={(e) => setCalories(e.target.value)}
            />
            <br />
            


            <label htmlFor="quantity">Quantity</label>
            <br />
            <input
                value = {quantity}
                type="quantity"
                placeholder="10.2"
                id="quantity"
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
            />
            <br />

            <label htmlFor="price">Price</label>
            <br />
            <input
                value = {price}
                type="price"
                placeholder="10.2"
                id="price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <br />
            <button className="button" type="submit">Add!</button>
            </form>
            </div>
        </div>
    ) : "";
}