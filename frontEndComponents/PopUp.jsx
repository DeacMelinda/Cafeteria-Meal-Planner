import React from 'react';
import { useState, useEffect } from 'react';
import './PopUp.css';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import imag from "./exit.png";

export const PopUp = (props) => {
  const [email, setEmail] = useState("");
  const SIMPLEUSERS_GET_BY_EMAIL = "http://localhost:8081/simpleusersapi/simpleUsers/su/";
  const CAFETERIA_GET_BY_EMAIL = "http://localhost:8081/cafeteriausersapi/cafeteriaUsers/cu/";

  const SIMPLEUSERS_URL = "http://localhost:8081/simpleusersapi/simpleUsers";
  const CAFETERIAS_URL = "http://localhost:8081/cafeteriausersapi/cafeteriaUsers";

  const [ simpleUsers, setSimpleUsers ] = useState([]);
  const [ cafeteriaUsers, setCafeteriaUsers ] = useState([]);

  const [ errorMessage, setErrorMessage ] = useState("");


  const [ data, setData ] = useState({users: [], isFetching: false});

  //incearca aici cu useEffect! Ca sa nu mai trebuiasca sa apesi de doua ori pe buton

  useEffect(() => {
    const getAllUsers = async () => {
        try {
            setData((data) => ({users: data.users, isFetching: true}));
            const response1 = await axios.get(SIMPLEUSERS_URL);
            const response2 = await axios.get(CAFETERIAS_URL)
            setData({users: response1.data.concat(response2.data), isFetching: false});
        } catch(e) {
            console.log(e);
            setData((data) => ({users: data.users, isFetching: false}));
        }
    };
    getAllUsers();
  }, [] );

  const sendEmail = async (e) => {

    e.preventDefault();

    const filtered = data.users.filter(usr => usr.email == email);
    if(filtered.length) {
      emailjs.send("default_service", "template_remember", {"email": filtered[0].email, "username": await filtered[0].username, "password": atob(await filtered[0].passwordEnc)}, "S9mOzsR3Mcmj8KJL0").then(function(response) {
              console.log('SUCCESS!', response.status, response.text);
              }, function(error) {
                  console.log('FAILED...', error);
                  setErrorMessage("Unknown email!");
              });
    }
    else {
      setErrorMessage("Unknown email!");
    }

  };

  return (props.trigger) ? (
    <div className='popup'>
      <div className="popup-inner">
        <button className='close-btn' onClick={()=>props.setTrigger(false)}><img className='imag' src={imag}/></button>
        { props.children }
        <h3>Remember credentials</h3>
        <form onSubmit={sendEmail}>
            <br></br>
            <input 
                value={email} 
                type="email" 
                placeholder="youremail@gmail.com" 
                id="email"
                name="email"
                onChange={(e)=>{setEmail(e.target.value); setErrorMessage("");}}
            />
            {errorMessage && <div style={{color: "red"}}> {errorMessage} </div>}
        </form>
        <br></br>
        <button className='cred-submit' type="submit" onClick={sendEmail}>Submit</button>

      </div>
    </div>
   ) : "";
  
}

