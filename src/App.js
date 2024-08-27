import React, { useEffect, useState } from 'react';
import UserHome from '../src/Components/UserHome/UserHome';
import PrivateRoutes from '../src/Routes/PrivateRoutes';
import PublicRoutes from '../src/Routes/PublicRoutes';
import Nav from '../src/Routes/Nav'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import '../src/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import RouteApi from './Service/RouteApi';

function App() {
  const [account, setAccount] = useState({});
  const infomt = {
    stdname: '',
    MaSV: ''
  }
  const [userinfo, setuserinfo] = useState(infomt);

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      let parsedAccount = JSON.parse(session);
      setAccount(parsedAccount);
      takeinfo();
    }
  }, []);

  const takeinfo = async () => {
    const info = await RouteApi.Leckinfo();
    setuserinfo({
      stdname: info.data.ED.name,
      MaSV: info.data.ED.MaSV
    });
  };

  let location = useLocation();
  const isAuthPage = location.pathname === '/Login' || location.pathname === '/register';

  return (
    <div className={isAuthPage ? '' : 'App-grid'}>
      {!isAuthPage && <Nav userinfo={userinfo} />} 
      <div className='Body-container'>
        <PublicRoutes />
        <PrivateRoutes path={'/UserHome'} component={UserHome} />
      </div>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
