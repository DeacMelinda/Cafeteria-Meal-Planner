import React from "react";
import { useHistory } from "react-router-dom";
import '../CafeteriasFromUser';
import '../TodaysOptionsSimple';
import '../TomorrowsOptionsSimple';
import './Navbar.css';

export const Navbar = (props) => {

    const history = useHistory();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    return ( 
        <div>
        <ul className="navul">
            <li className="navli"><button type="button" onClick={() => history.push('/profile/cafeterias')}>View Cafeterias</button></li>
            <li className="navli"><button type="button" onClick={() => history.push('/profile/today')}>Today's Menu</button></li>
            <li className="navli"><button type="button" onClick={() => history.push('/profile/tomorrow')}>Tomorrow's Options</button></li>
            <li className="navli"><p style={{ top:'10px', position:'absolute', left:'650px' }}>Today's Date: {date}</p></li>
        </ul>
        
        </div>
    );        
}
