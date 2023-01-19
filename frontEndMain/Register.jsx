import React, { useState } from "react"
import axios, { AxiosHeaders } from "axios";
import "./components/ImageSelector.css";
import "./Register.css";
import { useHistory } from "react-router-dom";


export default function Register(props){
    const history = useHistory();
    const [ email, setEmail ] = useState("");
    const [ passwordEnc, setPass ] = useState("");
    const [ password, setPassowrd ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ dateOfBirth, setBirthdate ] = useState(new Date());
    const [ profilePicture, setProfilePicture ] = useState("");
    const [ userType, setUserType ] = useState({simple: true, cafeteria: false});
    const [ cafeteriaName, setName ] = useState("");
    const [ city, setCity ] = useState("Cluj");
    const [ address, setAddress ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ program, setProgram ] = useState("");    
    const current = new Date().toISOString().split("T")[0];
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ okUsername, setOkUsername ] = useState(true);

    const SIMPLEUSER_POST_URL = "http://localhost:8081/simpleusersapi/simpleUser/";
    const CAFETERIA_POST_URL = "http://localhost:8081/cafeteriausersapi/cafeteriaUser/";
    const SIMPLEUSERS_GET_URL = "http://localhost:8081/simpleusersapi/simpleUsers/";
    const CAFETERIA_GET_URL = "http://localhost:8081/cafeteriausersapi/cafeteriaUsers/";



    const simpleUserAvatars = ["/avatar1.png","/avatar2.png","/avatar3.png", "/avatar4.png", "/avatar5.png", "/avatar6.png", "/avatar7.png", "/avatar8.png", "/avatar9.png", "/avatar10.png", "/avatar11.png", "/avatar12.png", "/avatar13.png", "/avatar14.png", "/avatar15.png", "/avatar16.png", "/avatar17.png", "/avatar18.png", "/avatar19.png", "/avatar20.png", "/avatar21.png", "/avatar22.png"];
    const cafeteriaAvatars = ["/cafeteria1.png", "/cafeteria2.png", "/cafeteria3.png", "/cafeteria4.png", "/cafeteria5.png"];
  

    const [ picIndex, setPicIndex ] = useState(0);
    const [ shownPic, setShownPic ] = useState("");
  
    function selectOnlyThisAvatar(id) {
      var myCheckbox = document.getElementsByName("mchbs");
      Array.prototype.forEach.call(myCheckbox, function(el) {
              el.checked = false;
              console.log(el.id);
      });
      id.checked = true;
  
      setShownPic(id.id);
      setProfilePicture(id.id);
  
    }
  
    const getSimpleUsersDivs = simpleUserAvatars.map(avatar => (
      <li className="li" key = {"myCheckbox"+simpleUserAvatars.indexOf(avatar)} hidden={userType.cafeteria}>
        <input type="checkbox" name="mchbs" id={avatar} onChange={(e) => selectOnlyThisAvatar(e.target)}/>
        <label className="label" htmlFor={avatar}><img src = {process.env.PUBLIC_URL + avatar}></img></label>
      </li>
    ));
  
    const getCafeteriaUsersDivs = cafeteriaAvatars.map(avatar => (
      <li className="li" key= {"myCheckbox"+(cafeteriaAvatars.indexOf(avatar)+22)} hidden={userType.simple}>
        <input type="checkbox" name="mchbs" id={avatar} onChange={(e) => selectOnlyThisAvatar(e.target)}/>
        <label className="label" htmlFor={avatar}><img src = {process.env.PUBLIC_URL + avatar}></img></label>
      </li>
      
    ));

    const checkUsername = () => {

        if (userType.simple) {
            axios.get(SIMPLEUSERS_GET_URL + username).then(res => {
                if (res.data) {
                    setErrorMessage("Username already exists.");
                    setOkUsername(false);
                } else {
                    setErrorMessage("");
                    setOkUsername(true);
                }
            });
        } else {
            axios.get(CAFETERIA_GET_URL + username).then(res => {
                if (res.data) {
                    setErrorMessage("Username already exists.");
                    setOkUsername(false);
                } else {
                    setErrorMessage("");
                    setOkUsername(true);
                }
            });
        }
    }

    const postCafeteria = () => {
        axios.post(CAFETERIA_POST_URL,{
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

    const postSimpleUser = () => {
        axios.post(SIMPLEUSER_POST_URL, {
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

        checkUsername(username);
        if(okUsername) {

            if(userType.simple) {
                if(profilePicture == "") {
                    profilePicture = process.env.PUBLIC_URL + simpleUserAvatars[0];
                }
                postSimpleUser();
            } else {
                if(profilePicture == "") {
                    profilePicture = process.env.PUBLIC_URL + cafeteriaAvatars[0];
                }
                postCafeteria();
            }
        }
    }

    function selectOnlyThis(id) {
        var myCheckbox = document.getElementsByName("myCheckbox");
        Array.prototype.forEach.call(myCheckbox, function(el) {
                el.checked = false;
        });
        id.checked = true;
        if (id.id ==="simple") {
            
            setUserType({ ...userType, ["simple"]: true, ["cafeteria"]: false });

            setShownPic(simpleUserAvatars[0]);
            setPicIndex(0);

        } else {

            setUserType({ ...userType, ["simple"]: false, ["cafeteria"]: true });
            setShownPic(cafeteriaAvatars[0]);
            setPicIndex(0);

        }

      }

    return (
        
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>


                <label htmlFor="username">Username</label>
                <input 
                    value={username} 
                    type="username" 
                    placeholder="username" 
                    id="username" 
                    name="username" 
                    onChange={(e)=>{setUsername(e.target.value); checkUsername(username)}}
                />
                {errorMessage && <div className="error"> {errorMessage} </div>}

                <br />
                <label htmlFor="password">Password</label>
                <input 
                    value={password} 
                    type="password" 
                    placeholder="********" 
                    id="password"
                    name="password"
                    onChange={(e)=>{setPass(btoa(e.target.value)); setPassowrd(e.target.value); checkUsername(username)}}
                />

                <br />
                <label htmlFor="email">Email</label>
                <input 
                    value={email} 
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    id="email"
                    name="email"
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <br />
                <label>
                    <input type="checkbox" name="myCheckbox" checked={userType.simple} id="simple" onChange={(e)=>selectOnlyThis(e.target)} />
                    Simple User
                </label>

                <label>
                    <input type="checkbox" name="myCheckbox" id="cafeteria" checked={userType.cafeteria} onChange={(e)=>selectOnlyThis(e.target)} />
                    Cafeteria
                </label>

                <div className="list-containter">
                    <ul className="avatar-list">
                        {getSimpleUsersDivs}{getCafeteriaUsersDivs}
                    </ul>
                </div>
                

                <br></br>
                    <label for="lastName" hidden={userType.cafeteria}>Last Name</label>
                    <input 
                        value={lastName} 
                        type="lastName" 
                        placeholder="Last Name" 
                        id="lastName"
                        name="lastName"
                        hidden={userType.cafeteria}
                        onChange={(e)=>setLastName(e.target.value)}
                    />
                    <br hidden={userType.cafeteria}/>
                    
                    <label htmlFor="firstName" hidden={userType.cafeteria}>First Name</label>
                    <input 
                        value={firstName} 
                        type="firstName" 
                        placeholder="First Name" 
                        id="firstName"
                        name="firstName"
                        hidden={userType.cafeteria}
                        onChange={(e)=>setFirstName(e.target.value)}
                    />
                    <br hidden={userType.cafeteria}/>

                    <label htmlFor="birthDate" hidden={userType.cafeteria}>BirthDate</label>
                    <input 
                        value={dateOfBirth}
                        type="date"
                        placeholder='Enter BirthDate'
                        onChange={(e)=>setBirthdate(e.target.value)}
                        name='birthdate'
                        hidden={userType.cafeteria}
                        max={current}
                    />
                    <label htmlFor="cafeteriaName" hidden={userType.simple}>Name</label>
                    <input 
                        value={cafeteriaName} 
                        type="cafeteriaName" 
                        placeholder="cafeteriaName" 
                        id="cafeteriaName"
                        name="cafeteriaName"
                        hidden={userType.simple}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <br hidden={userType.simple}/>
                    
                    <label htmlFor="cities" hidden={userType.simple}>City</label>
                    {/* <input 
                        value={city} 
                        type="city" 
                        placeholder="City" 
                        id="city"
                        name="city"
                        hidden={userType.simple}
                        onChange={(e)=>setCity(e.target.value)}
                    /> */}
                    <select name="cities" id="cities" hidden={userType.simple} onChange={(e)=>setCity(e.target.value)}>
                        <option value={city}>Cluj</option>
                    </select>
                    <br hidden={userType.simple}/>

                    <label htmlFor="address" hidden={userType.simple}>Address</label>
                    <input 
                        value={address}
                        type="address"
                        placeholder="Address"
                        onChange={(e)=>setAddress(e.target.value)}
                        name='address'
                        hidden={userType.simple}
                    />
                    <br hidden={userType.simple}/>
                    
                    <label htmlFor="phoneNumber" hidden={userType.simple}>Phone Number</label>
                    <input 
                        value={phoneNumber} 
                        type="phoneNumber" 
                        placeholder="Phone Number" 
                        id="phoneNumber"
                        name="phoneNumber"
                        hidden={userType.simple}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                    />
                    <br hidden={userType.simple}/>

                    <label htmlFor="description" hidden={userType.simple}>Description</label>
                    <input 
                        value={description} 
                        type="description" 
                        placeholder="Description" 
                        id="description"
                        name="description"
                        hidden={userType.simple}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                    <br hidden={userType.simple}/>

                    <label htmlFor="program" hidden={userType.simple}>Program</label>
                    <input 
                        value={program} 
                        type="program" 
                        placeholder="Program" 
                        id="program"
                        name="program"
                        hidden={userType.simple}
                        onChange={(e)=>setProgram(e.target.value)}
                    />
                    <br hidden={userType.simple}/>
                <br />
                <button className="buttonss" type="submit">Register</button>
            </form>
            <br />
            <button className="link-btn" onClick={() => history.push('/login')}>Already have an account? Login here.</button>
        </div>
    )
}