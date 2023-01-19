import React, { useState } from "react";
import "./ImageSelector.css";

const UploadImage = (props) => {

  const simpleUserAvatars = ["/avatar1.png","/avatar2.png","/avatar3.png", "/avatar4.png", "/avatar5.png", "/avatar6.png", "/avatar7.png", "/avatar8.png", "/avatar9.png", "/avatar10.png", "/avatar11.png", "/avatar12.png", "/avatar13.png", "/avatar14.png", "/avatar15.png", "/avatar16.png", "/avatar17.png", "/avatar18.png", "/avatar19.png", "/avatar20.png", "/avatar21.png", "/avatar22.png"];
  const cafeteriaAvatars = ["/cafeteria1.png", "/cafeteria2.png", "/cafeteria3.png", "/cafeteria4.png", "/cafeteria5.png"];

  const [ simpleUserSelected, setSimpleUserSelected ] = useState("/avatar1.png");
  const [ cafeteriaSelected, setCafeteriaSelected ] = useState("/cafeteria1.png");

  function selectOnlyThisAvatar(id) {
    var myCheckbox = document.getElementsByName("mchbs");
    Array.prototype.forEach.call(myCheckbox, function(el) {
            el.checked = false;
            console.log(el.id);
    });
    id.checked = true;

    if(simpleUserAvatars.indexOf(id.id) != -1) {
      setSimpleUserSelected(id.id);
      setCafeteriaSelected("");
    } else {
      setSimpleUserSelected("");
      setCafeteriaSelected(id.id);
    }

  }

  const getSimpleUsersDivs = simpleUserAvatars.map(avatar => (
    <li className="li" hidden={props.cafeteriaUser}>
      <input type="checkbox" name="mchbs" id={"myCheckbox"+simpleUserAvatars.indexOf(avatar)} onChange={(e) => selectOnlyThisAvatar(e.target)}/>
      <label className="label" htmlFor={"myCheckbox"+simpleUserAvatars.indexOf(avatar)}><img src = {process.env.PUBLIC_URL + avatar}></img></label>
    </li>
    
  ));

  const getCafeteriaUsersDivs = cafeteriaAvatars.map(avatar => (
    <li hidden={props.simpleUser}>
      <input type="checkbox" name="mchbs" id={"myCheckbox"+(cafeteriaAvatars.indexOf(avatar)+22)} onChange={(e) => selectOnlyThisAvatar(e.target)}/>
      <label className="label" htmlFor={"myCheckbox"+(cafeteriaAvatars.indexOf(avatar)+22)}><img src = {process.env.PUBLIC_URL + avatar}></img></label>
    </li>
    
  ));

  return (
    <ul className="ul">
    {getSimpleUsersDivs}
    {getCafeteriaUsersDivs}
    </ul>
   
  );
};

export default UploadImage;