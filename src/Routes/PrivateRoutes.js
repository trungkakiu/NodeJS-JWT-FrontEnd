import {
    BrowserRouter as Router,
    Route,
  } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/useContext';
import Cookies from 'js-cookie';

const PrivateRoutes = ({ path, component }) => {
    let history = useHistory();
    const { user } = useContext(UserContext);
  
    useEffect(() => {
      console.log("Check context: ", user);
      let session = sessionStorage.getItem('account');
      console.log(session);
  
      // Kiểm tra jwt cookie
      let jwtToken = Cookies.get('jwt');
      if (!session || !jwtToken) {
        history.push('/Login');
      }
    }, [history, user]);
  
    return (
      <>
        <Route path={path} component={component} />
      </>
    );
  };
  
  export default PrivateRoutes;