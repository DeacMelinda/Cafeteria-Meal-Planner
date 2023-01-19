import React from "react";
import { useAuth } from "./components/Auth";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { CafeteriaSidebar } from "./components/CafeteriaSidebar";
import "./ViewProfile.css";

export const ViewProfile = () => {
    const auth = useAuth();
    const [ userType, setUserType ] = useState({simple: !auth.user.profilePicture.includes("cafeteria"), cafeteria: auth.user.profilePicture.includes("cafeteria")});
    
    return (
        <div className="profile-div">
            {userType.simple ? <Sidebar></Sidebar> : <CafeteriaSidebar></CafeteriaSidebar>}
            <div >
            <h3>Username:  </h3> <h5>{auth.user.username}</h5>
            <h3>Email:   </h3><h5>{auth.user.email}</h5>
            <h3>Profile Picture:   <img style = {{width:"70px", height:"70px"}} src = {process.env.PUBLIC_URL + auth.user.profilePicture}></img></h3>
            <h3 hidden={userType.cafeteria}>Last Name:   </h3> <h5>{auth.user.lastName}</h5>
            <h3 hidden={userType.cafeteria}>First Name:   </h3> <h5>{auth.user.firstName}</h5>
            <h3 hidden={userType.cafeteria}>Birthdate:   </h3> <h5>{auth.user.dateOfBirth}</h5>
            <h3 hidden={userType.simple}>Cafeteria Name:   </h3> <h5>{auth.user.cafeteriaName}</h5>
            <h3 hidden={userType.simple}>City:   </h3> <h5>{auth.user.city}</h5>
            <h3 hidden={userType.simple}>Address:   </h3> <h5>{auth.user.address}</h5>
            <h3 hidden={userType.simple}>Phone Number:   </h3> <h5>{auth.user.phoneNumber}</h5>
            <h3 hidden={userType.simple}>Description:   </h3> <h5>{auth.user.description}</h5>
            <h3 hidden={userType.simple}>Program:   </h3> <h5>{auth.user.program}</h5>
        </div>
        </div>
    )
}