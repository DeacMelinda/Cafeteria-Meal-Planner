import React, { useState } from "react";
import axios from "axios";
import "./components/ImageSelector.css";
import "./Register.css";
import { useAuth } from "./components/Auth";
import { Sidebar } from "./components/Sidebar";
import { CafeteriaSidebar } from "./components/CafeteriaSidebar";
import "./Settings.css";

export const Settings = () => {

    const auth = useAuth();
    const [ email, setEmail ] = useState("");
    const [ passwordEnc, setPass ] = useState("");
    const [ password, setPassowrd ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ profilePicture, setProfilePicture ] = useState("");
    const [ userType, setUserType ] = useState({simple: !auth.user.profilePicture.includes("cafeteria"), cafeteria: auth.user.profilePicture.includes("cafeteria")});
    const [ cafeteriaName, setName ] = useState("");
    const [ city, setCity ] = useState("Cluj");
    const [ address, setAddress ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ program, setProgram ] = useState("");    

    const [okEmail, setOkEmail] = useState(false);
    const [okPassEnc, setOkPassEnc] = useState(false);
    const [okLastName, setOkLastName] = useState(false);
    const [okFirstName, setOkFirstName] = useState(false); 
    const [okProfilePicture, setOkProfilePicture] = useState(false);
    const [okCafeteriaName, setOkCafeteriaName] = useState(false);
    const [okCity, setOkCity] = useState(false);
    const [okAddress, setOkAddress] = useState(false);
    const [okPhoneNumber, setOkPhoneNumber] = useState(false);
    const [okDescription, setOkDescription] = useState(false);
    const [okProgram, setOkProgram] = useState(false);

    const SIMPLEUSER_PUT_URL = "http://localhost:8081/simpleusersapi/simpleUser/settings/";
    const CAFETERIA_PUT_URL = "http://localhost:8081/cafeteriausersapi/cafeteriaUser/settings/";

    const simpleUserAvatars = ["/avatar1.png","/avatar2.png","/avatar3.png", "/avatar4.png", "/avatar5.png", "/avatar6.png", "/avatar7.png", "/avatar8.png", "/avatar9.png", "/avatar10.png", "/avatar11.png", "/avatar12.png", "/avatar13.png", "/avatar14.png", "/avatar15.png", "/avatar16.png", "/avatar17.png", "/avatar18.png", "/avatar19.png", "/avatar20.png", "/avatar21.png", "/avatar22.png"];
    const cafeteriaAvatars = ["/cafeteria1.png", "/cafeteria2.png", "/cafeteria3.png", "/cafeteria4.png", "/cafeteria5.png"];
  
    const [ shownPic, setShownPic ] = useState("");
  
    function selectOnlyThisAvatar(id) {
      var myCheckbox = document.getElementsByName("mchbs");
      Array.prototype.forEach.call(myCheckbox, function(el) {
              el.checked = false;
      });
      id.checked = true;
  
      setShownPic(id.id);
      setProfilePicture(id.id);
  
    }
  
    const getSimpleUsersDivs = simpleUserAvatars.map(avatar => (
      <li className="li" key = {"myCheckbox"+simpleUserAvatars.indexOf(avatar)} hidden={userType.cafeteria}>
        <input type="checkbox" name="mchbs" id={avatar} onChange={(e) => {selectOnlyThisAvatar(e.target); setOkProfilePicture(true);}}/>
        <label className="label" htmlFor={avatar}><img src = {process.env.PUBLIC_URL + avatar}></img></label>
      </li>
    ));
  
    const getCafeteriaUsersDivs = cafeteriaAvatars.map(avatar => (
      <li className="li" key= {"myCheckbox"+(cafeteriaAvatars.indexOf(avatar)+22)} hidden={userType.simple}>
        <input type="checkbox" name="mchbs" id={avatar} onChange={(e) => {selectOnlyThisAvatar(e.target); setOkProfilePicture(true);}}/>
        <label className="label" htmlFor={avatar}><img src = {process.env.PUBLIC_URL + avatar}></img></label>
      </li>
      
    ));

    const putCafeteria = () => {
        const username = auth.user.username;

        axios.put(CAFETERIA_PUT_URL+username,{
            username,
            passwordEnc,
            email,
            profilePicture,
            cafeteriaName,
            city,
            address,
            phoneNumber,
            description,
            program
        }).then(res => console.log('Posting data1', res)).catch(err => console.log(err));
    }

    const putSimpleUser = () => {
        const username = auth.user.username;
        const dateOfBirth = auth.user.dateOfBirth;

        axios.put(SIMPLEUSER_PUT_URL + username, {
            username,
            passwordEnc,
            email,
            profilePicture,
            firstName,
            lastName,
            dateOfBirth
        }).then(res => console.log('Posting data2', res)).catch(err => console.log(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        {userType.simple ? putSimpleUser() : putCafeteria()}
    }

    return (
        
        <div className="settings">
            <form className="settings-form" onSubmit={handleSubmit}>
            {userType.simple ? <Sidebar></Sidebar> : <CafeteriaSidebar></CafeteriaSidebar>}
                <label htmlFor="password">New Password:</label>
                <input 
                    value={password} 
                    type="password" 
                    placeholder="********" 
                    id="password"
                    name="password"
                    onChange={(e)=>{setPass(btoa(e.target.value)); setPassowrd(e.target.value)}}
                />

                <br />
                <h5>Email: {auth.user.email}</h5>
                <label htmlFor="email">New Email:</label>
                <input 
                    value={email} 
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    id="email"
                    name="email"
                    onChange={(e)=>{setEmail(e.target.value);}}
                />
                <br />

                <h5>Current Avatar:</h5>
                <img style = {{width:"70px", height:"70px"}}src = {process.env.PUBLIC_URL + auth.user.profilePicture}></img>
                <p>New Avatar:</p>
                <div style={{maxWidth: "570px"}}>
                    <ul className="avatar-list">
                        {getSimpleUsersDivs}{getCafeteriaUsersDivs}
                    </ul>
                </div>
                

                <br></br>
                    <h5 hidden={userType.cafeteria}>Current Last Name: {auth.user.lastName}</h5>
                    <label for="lastName" hidden={userType.cafeteria}>New Last Name:</label>
                    <input 
                        value={lastName} 
                        type="lastName" 
                        placeholder="Last Name" 
                        id="lastName"
                        name="lastName"
                        hidden={userType.cafeteria}
                        onChange={(e)=>{setLastName(e.target.value);}}
                    />
                    <br hidden={userType.cafeteria}/>
                    
                    <h5 hidden={userType.cafeteria}>Current First Name: {auth.user.firstName}</h5>
                    <label htmlFor="firstName" hidden={userType.cafeteria}>New First Name:</label>
                    <input 
                        value={firstName} 
                        type="firstName" 
                        placeholder="First Name" 
                        id="firstName"
                        name="firstName"
                        hidden={userType.cafeteria}
                        onChange={(e)=>{setFirstName(e.target.value);}}
                    />
                    <br hidden={userType.cafeteria}/>

                    <h5 hidden={userType.simple}>Current Name: {auth.user.cafeteriaName}</h5>
                    <label htmlFor="cafeteriaName" hidden={userType.simple}>New Name:</label>
                    <input 
                        value={cafeteriaName} 
                        type="cafeteriaName" 
                        placeholder="cafeteriaName" 
                        id="cafeteriaName"
                        name="cafeteriaName"
                        hidden={userType.simple}
                        onChange={(e)=>{setName(e.target.value);}}
                    />
                    <br hidden={userType.simple}/>
                    
                    <h5 hidden={userType.simple}>Current City: {auth.user.city}</h5>
                    <label htmlFor="cities" hidden={userType.simple}>New City:</label>
                    <select name="cities" id="cities" hidden={userType.simple} onChange={(e)=>{setCity(e.target.value);}}>
                        <option value={city}>Cluj</option>
                    </select>
                    <br hidden={userType.simple}/>

                    <h5 hidden={userType.simple}>Current Address: {auth.user.address}</h5>
                    <label htmlFor="address" hidden={userType.simple}>New Address:</label>
                    <input 
                        value={address}
                        type="address"
                        placeholder="Address"
                        onChange={(e)=>{setAddress(e.target.value);}}
                        name='address'
                        hidden={userType.simple}
                    />
                    <br hidden={userType.simple}/>
                    
                    <h5 hidden={userType.simple}>Current Phone Number: {auth.user.phoneNumber}</h5>
                    <label htmlFor="phoneNumber" hidden={userType.simple}>New Phone Number:</label>
                    <input 
                        value={phoneNumber} 
                        type="phoneNumber" 
                        placeholder="Phone Number" 
                        id="phoneNumber"
                        name="phoneNumber"
                        hidden={userType.simple}
                        onChange={(e)=>{setPhoneNumber(e.target.value);}}
                    />
                    <br hidden={userType.simple}/>

                    <h5 hidden={userType.simple}>Current Description:</h5>
                    <p hidden={userType.simple}>{auth.user.description}</p>
                    <label htmlFor="description" hidden={userType.simple}>New Description:</label>
                    <input 
                        value={description} 
                        type="description" 
                        placeholder="Description" 
                        id="description"
                        name="description"
                        hidden={userType.simple}
                        onChange={(e)=>{setDescription(e.target.value);}}
                    />
                    <br hidden={userType.simple}/>

                    <h5 hidden={userType.simple}>Current Program: {auth.user.program}</h5>
                    <label htmlFor="program" hidden={userType.simple}>New Program:</label>
                    <input 
                        value={program} 
                        type="program" 
                        placeholder="Program" 
                        id="program"
                        name="program"
                        hidden={userType.simple}
                        onChange={(e)=>{setProgram(e.target.value);}}
                    />
                    <br hidden={userType.simple}/>
                <br />
                <button className="buttonss" type="submit">Apply Changes</button>
            </form>
            <br />
        </div>
    )
}