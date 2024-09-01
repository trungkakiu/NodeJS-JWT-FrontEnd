import React, { useEffect, useState, useContext } from 'react';
import UserHome from '../src/Components/UserHome/UserHome';
import PrivateRoutes from '../src/Routes/PrivateRoutes';
import PublicRoutes from '../src/Routes/PublicRoutes';
import Nav from '../src/Routes/Nav'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import '../src/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import RouteApi from './Service/RouteApi';
import HomePage from './HomePage/HomePage';
import { Rings } from 'react-loader-spinner';
import { AuthContext } from './Context/Authenticate-context';

function App() {
  const [account, setAccount] = useState({});
  const infomt = { stdname: '', MaSV: '' };
  const [userinfo, setuserinfo] = useState(infomt);
  const { authState } = useContext(AuthContext);

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
        {authState.isLoading ? (
          <div className='Loading-page'>
            <Rings
              height="80"
              width="80"
              radius="9"
              color="blue"
              ariaLabel="loading"
              wrapperStyle={{ margin: 'auto' }} 
              wrapperClass=""
            />
          </div>
        ) : (
          <div>
          
            {authState.isAuthenticate && (
              <>
                <PrivateRoutes path={'/UserHome'} component={UserHome} />
                <PrivateRoutes path={'/Home'} component={HomePage} />
              </>
            )}
          </div>
        )}
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
