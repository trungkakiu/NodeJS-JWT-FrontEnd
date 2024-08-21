// App.js
import React, { useEffect, useState } from 'react';
import UserHome from '../src/Components/UserHome/UserHome';
import PrivateRoutes from '../src/Routes/PrivateRoutes';
import PublicRoutes from '../src/Routes/PublicRoutes';
import Nav from '../src/Components/Navigation/Nav'
// import NavNoAuthenticate from '../src/Components/Navigation/NavNoAuthenticate'
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [account, setaccount] = useState({});
  useEffect(()=>{
    let session = sessionStorage.getItem('account');
    console.log(sessionStorage.getItem('account'));
    if(session){
      let parsedAccount = JSON.parse(session);
      console.log("Parsed Account Data: ", parsedAccount);
      setaccount(parsedAccount)
      
    }
  },[]);
  return (
    <Router>
      <div className='Header-container'>
      {
        account && !_.isEmpty(account) && account.isAuthenticate  && <Nav /> 

      }
      </div>
      <div className='Body-container'>
      <PublicRoutes/>
      <PrivateRoutes path={'/UserHome'} component={UserHome}/>
      
      </div>
    </Router>
  );
}

export default App;
