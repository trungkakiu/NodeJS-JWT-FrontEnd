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
    return (
        <>
        {isShow === true ? (<div className="topnav">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/UserHome" activeClassName="active">User Home</NavLink>
            {/* <NavLink to="/Login" activeClassName="active">Login</NavLink> */}
            <NavLink to="/contact" activeClassName="active">Contact</NavLink>
            <NavLink to="/about" activeClassName="active">About</NavLink>
            </div>) : (<div className="topnav">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
            {/* <NavLink to="/news" activeClassName="active">News</NavLink> */}
            <NavLink to="/Login" activeClassName="active">Login</NavLink>
            {/* <NavLink to="/contact" activeClassName="active">Contact</NavLink> */}
            <NavLink to="/about" activeClassName="active">About</NavLink>
            </div>)
            
        }
      
        </>
        
    );
}


export default Nav;
