import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AddNewMenuItem } from "./components/AddNewMenuItem";
import "./MenuItemsTable.css";

export const MenuItemsTable = ({data, isFetching, setData}) => {

    const updateMenuItemURL = "http://localhost:8081/menuitemsapi/menuItem/editMenuItem/";
    const updateIngredientsURL = "http://localhost:8081/menuitemsapi/menuItem/editIngredients/";
    const updateAllergensURL = "http://localhost:8081/menuitemsapi/menuItem/editAllergens/";
    const updateCaloriesURL = "http://localhost:8081/menuitemsapi/menuItem/editCalories/";
    const updateQuantityURL = "http://localhost:8081/menuitemsapi/menuItem/editQuantity/";
    const updatePriceURL = "http://localhost:8081/menuitemsapi/menuItem/editPrice/";
    const updateWhole = "http://localhost:8081/menuitemsapi/menuItems/whole/";

    const deleteURL = "http://localhost:8081/menuitemsapi/menuItem/";
    const getURL = "http://localhost:8081/menuitemsapi/menuItems";

    const addURL = "http://localhost:8081/menuitemsapi/menuItem";

    const [ editable, setEditable ] = useState(false);
    const [ editableName, setEditableName ] = useState("");
    const [ selected, setSelected ] = useState(null);

    const errMsg = "Menu Item is being used. Cannot delete!";
    
    const [hideErr, setHideErr] = useState(true);

    const [menuItems, setMenuItems] = useState(data);

    const [ addNewItem, setAddNewItem ] = useState(false);

    const [ rerender, setRerender ] = useState(false);

    useEffect(()=>{
        if(rerender) {
            axios.get(getURL).then(res => {setMenuItems(res.data);
                setRows(res.data.map(
                    item => (
                        <tr name="tr" id={item.menuItem}>
                            <td>{item.menuItemID}</td>
                            <td contentEditable = {item.menuItem===editableName && editable}>{item.menuItem}</td>
                            <td contentEditable = {item.menuItem===editableName && editable}>{item.ingredients}</td>
                            <td contentEditable = {item.menuItem===editableName && editable}>{item.allergens}</td>
                            <td contentEditable = {item.menuItem===editableName && editable}>{item.quantity}</td>
                            <td contentEditable = {item.menuItem===editableName && editable}>{item.calories}</td>
                            <td contentEditable = {item.menuItem===editableName && editable}>{item.price}</td>
                            <td ><input type="checkbox" name="chb" onClick={(e) => selectOnlyThisRow(e.target, item)}></input></td>
                        </tr>
                    )))})
            }
            setRerender(false);
        
     } )

    const editButton = () => {
        if(selected) {
            var set = false;
            var rows = document.getElementsByName("tr");
            for(let i = 0; i < rows.length; i++) {
                var elements = rows[i].innerHTML.split("<td contenteditable=>");
                for(let j = 0; j < elements.length; j++) {
                    if(elements[j].includes(selected.menuItemID))
                    {
                        var details = elements[j].split("<td contenteditable=\"true\">");
                        var menuItem = details[1].slice(0,-5);
                        var ingredients = details[2].slice(0,-5);
                        var allergens = details[3].slice(0,-5);
                        var quantity = details[4].slice(0,-5);
                        var calories = details[5].slice(0,-5);
                        var price = details[6].slice(0,-48);
                        set = true;

                        console.log(menuItem);

                        axios.put(updateWhole+selected.menuItemID, {
                            menuItem,
                            ingredients,
                            allergens,
                            quantity,
                            calories,
                            price
                        }).then(res => console.log(res)).catch(err => console.log(err));
                        
                        break;
                    }
    
                }
                if(set) break;
            }
        }
        
    }

    const addButton = () => {
        setAddNewItem(true);

    }

    const displayErr = () => {
        setHideErr(false);
    }

    const deleteButton = () => {
        if(selected) {
            let initLen = menuItems.length > 0 ? menuItems.length : data.length;
            
            axios.delete(deleteURL+selected.menuItemID).then(r =>{
                axios.get(getURL).then(res => {console.log(res.data); 
                    let curLen = res.data.length;
                    if(curLen < initLen) {
                        setMenuItems(res.data);
                        setRows(res.data.map(
                            item => (
                                <tr name="tr" id={item.menuItem}>
                                    <td>{item.menuItemID}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.menuItem}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.ingredients}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.allergens}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.quantity}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.calories}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.price}</td>
                                    <td ><input type="checkbox" name="chb" onClick={(e) => selectOnlyThisRow(e.target, item)}></input></td>
                                </tr>
                            )));
                    } else {
                        displayErr();
                    }
                })
            
            }).catch(err => displayErr());
        }
    }
    
    function selectOnlyThisRow(id, item) {
        var myCheckbox = document.getElementsByName("chb");
        Array.prototype.forEach.call(myCheckbox, function(el) {
                el.checked = false;
        });
        id.checked = true;
        setHideErr(true);
        setSelected(item);
        setEditableName(item.menuItem);
        setEditable(true);
    }

    const [rows, setRows] = useState(data.map(
        item => (
            <tr name="tr" id={item.menuItem}>
                <td>{item.menuItemID}</td>
                <td contentEditable = {item.menuItem===editableName && editable}>{item.menuItem}</td>
                <td contentEditable = {item.menuItem===editableName && editable}>{item.ingredients}</td>
                <td contentEditable = {item.menuItem===editableName && editable}>{item.allergens}</td>
                <td contentEditable = {item.menuItem===editableName && editable}>{item.quantity}</td>
                <td contentEditable = {item.menuItem===editableName && editable}>{item.calories}</td>
                <td contentEditable = {item.menuItem===editableName && editable}>{item.price}</td>
                <td ><input type="checkbox" name="chb" onClick={(e) => selectOnlyThisRow(e.target, item)}></input></td>
            </tr>
        )))


    return (
        isFetching ? <div><p>Fetching data...</p></div> : 
        <div className="outert">
            <div className="table">
                <table id="table">
                    <tr>
                        <th>ID</th>
                        <th>Menu Item</th>
                        <th>Ingredients</th>
                        <th>Allergens</th>
                        <th>Quantity</th>
                        <th>Calories</th>
                        <th>Price</th>
                        <th>Select</th>
                    </tr>
                    {
                        menuItems.length > 0 ? rows : data.map(
                            item => (
                                <tr name="tr" id={item.menuItem}>
                                    <td>{item.menuItemID}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.menuItem}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.ingredients}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.allergens}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.quantity}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.calories}</td>
                                    <td contentEditable = {item.menuItem===editableName && editable}>{item.price}</td>
                                    <td ><input type="checkbox" name="chb" onClick={(e) => selectOnlyThisRow(e.target, item)}></input></td>
                                </tr>
                            ))
                    }
                </table>
            </div>
            <div className="buttons">
                <button type="button" onClick={() => addButton()}>Add</button><br/><br/>
                <button type="button" onClick={() => editButton()}>Edit</button><br/><br/>
                <button type="button" onClick={() => deleteButton()}>Delete</button><br/>
            </div>
            <h5 className="error" color="red" hidden={hideErr}>{errMsg}</h5>
            <AddNewMenuItem trigger = {addNewItem} setTrigger = {setAddNewItem} setRerender = {setRerender}/>
        </div>
        
    )
}