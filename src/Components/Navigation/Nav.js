// Nav.js
import '../../../src/App.scss'
import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    let [isShow, setisShow] =  useState({})
    useEffect (()=>{
       let session = sessionStorage.getItem("account")
       if(session){
        setisShow(true)
       }

    },[]);
   
}


export default Nav;
