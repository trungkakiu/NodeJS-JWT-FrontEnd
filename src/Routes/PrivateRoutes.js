import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/Authenticate-context';

const PrivateRoutes = ({ path, component }) => {
  const { authState } = useContext(AuthContext); 

  if (authState && authState.isAuthenticate) {
    return <Route path={path} component={component} />;
  } else {
    return <Redirect to="/Login" />;
  }
};

export default PrivateRoutes;
