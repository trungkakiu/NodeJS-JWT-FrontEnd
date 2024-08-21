import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/useContext';


const PrivateRoutes = (props) =>{
    let history = useHistory();
    const { user } = useContext(UserContext);
    useEffect(()=>{
        console.log("Check context: ", user )
        let session = sessionStorage.getItem('account');
        console.log(sessionStorage.getItem('account'));
        if(!session){
            history.push('/Login');
        }
      },[]);

    return (
        <>
            <Route path={props.path} component={props.component}/>
        </>
    )
}

export default PrivateRoutes;