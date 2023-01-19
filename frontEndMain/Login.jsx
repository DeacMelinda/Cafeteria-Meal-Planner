import axios from "axios";
import React, { useState } from "react"
import { PopUp } from "./components/PopUp";
import { useHistory } from "react-router-dom";
import { useAuth } from "./components/Auth";

export default function Login(props) {
    const history = useHistory();
    const auth = useAuth();
    const [ username, setUsername ] = useState("");
    const [ passwordEnc, setPass ] = useState("");
    const [ password, setPassowrd ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ forgot, setForgot ] = useState(false);

    const SIMPLEUSERS_GET_URL = "http://localhost:8081/simpleusersapi/simpleUsers/";
    const CAFETERIA_GET_URL = "http://localhost:8081/cafeteriausersapi/cafeteriaUsers/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const simpleData = await axios.get(SIMPLEUSERS_GET_URL+username).then(res => res.data);
        const cafeteriaData = await axios.get(CAFETERIA_GET_URL+username).then(res => res.data);
        
        if(simpleData) {
            if(simpleData.passwordEnc == passwordEnc) {
                auth.login(simpleData);
                history.push('/profile/cafeterias', {replace: true});
                setErrorMessage("");
            } else {
                setErrorMessage("Wrong Password!!!!!");
            }
        } else if(cafeteriaData) {
            if(cafeteriaData.passwordEnc == passwordEnc) {
                auth.login(cafeteriaData);
                history.push('/cafeteria/home', {replace: true});
                setErrorMessage("");
            } else {
                setErrorMessage("Wrong Password!!!!!");
            }
        } else {
            setErrorMessage("Wrong Username!!!!!");
        }
    }

    return (
        <div className="auth-form-container" >
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
                <input 
                    value={username} 
                    type="username" 
                    placeholder="username" 
                    id="username" 
                    name="username" 
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <br />
                <label htmlFor="password">Password</label>
                <input 
                    value={password} 
                    type="password" 
                    placeholder="********" 
                    id="password"
                    name="password"
                    onChange={(e)=>{setPass(btoa(e.target.value)); setPassowrd(e.target.value)}}
                />
                
                {errorMessage && <div className="errorMSG"> {errorMessage} </div>}
                <br />
                <button className="buttonss" type="submit">Log In</button>
            </form>
            <br />
            <button className="buttonss" onClick = {()=>setForgot(true)}>Forgot userame or password?</button>
            
            <button className="link-btn" onClick={() => history.push("/register")}>Don't have an account? Register here.</button>

            <PopUp trigger = {forgot} setTrigger = {setForgot}>
            </PopUp>
        </div>
    );
}
