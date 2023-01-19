import React from 'react';
import { useHistory } from "react-router-dom";
import { CafeteriaSidebar } from "./components/CafeteriaSidebar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './components/Auth';
import Tooltip from '@mui/material/Tooltip';
import "./TodayCafeteria.css";
import "./components/TomorrowMenuItems.css";

const menuItemsURL = "http://localhost:8081/menuitemsapi/menuItems";


export const TomorrowCaf= () => {
    const history = useHistory();

    const current = new Date();


    let tomorrow =  new Date()
    tomorrow.setDate(current.getDate() + 1)

    const date = `${tomorrow.getDate()}/${tomorrow.getMonth()+1}/${tomorrow.getFullYear()}`;
    
    const auth = useAuth();

    const updateTomorrowURL = "http://localhost:8081/cafeteriausersapi/cafeteriaUser/tomorrowMenu/"+auth.user.username;
    const generateMenuURL = "http://localhost:8081/menuapi/menu";
    const getMenuURL = "http://localhost:8081/menuapi/menus/";

    const [selection, setSelection] = useState([]);

    const [ data, setData ] = useState({menuItems: [], isFetching: false});
    const [ submitted, setSubmitted ] = useState(auth.user.tomorrowMenu);

    
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

    const updateCafeteria = () => {
        axios.put(updateTomorrowURL, {"menuTitle": auth.user.username+date, "menuItems": selection});
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
        }

        if(!found) {
            setSelection([
                ...selection,
                item
              ]);
        }

        
    }

    return (
        <div>
            <button style={{border:"none", background:"transparent", left:"4px", top:"4px", position:"absolute"}} onClick={() => history.push("/cafeteria/home")}><img src={process.env.PUBLIC_URL + "/home.png"} style={{width:"40px", height:"40px"}}/></button>
            
            {/* <div><TomorrowMenuItemsHook writeOn={writeOn} setWriteOn={setWriteOn}/></div> */}

            {!data.isFetching && <div>
            <div className="selection">
                <div>
                    <table>
                        <tr>
                            <th>Menu Item</th>
                            <th>Select</th>
                        </tr>
                        {
                            data.menuItems.map(
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
                { !auth.user.tomorrowMenu && !submitted && <button className="submit" type="button" onClick={(e) => {updateCafeteria(); setSubmitted(true);}}>Submit!</button>}
                </div>
            </div>}

            <div>
                <div className='paper'>

                    <div className="lines"></div>
                    <div className='text'>
                        <h3>{date}</h3>
                        <br></br>
                        <ul>
                            {auth.user.tomorrowMenu ? (auth.user.tomorrowMenu.menuItems.map(item =>
                                <li>{item.menuItem}</li>
                            )) : (selection.length == 0 ? "" : selection.map(item => (
                                <li>{item.menuItem}</li>
                            )))}
                        </ul>
                    </div> 
                    
                    <div className="holes hole-top"></div>
                    <div className="holes hole-middle"></div>
                    <div className="holes hole-bottom"></div>

                </div>
            </div>

            <CafeteriaSidebar/>

        </div>
    );
};

