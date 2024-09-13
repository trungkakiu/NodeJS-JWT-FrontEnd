import React, { useEffect, useState, useContext, } from 'react';
import UserHome from '../src/Components/UserHome/UserHome';
import StudentPrivateRoutes from './Routes/StudentPrivateRoutes';
import PublicRoutes from './Routes/PublicRoutes';
import Nav from './Routes/SvNav/Nav'; 
import GvNav from './Routes/GvNav/GvNav'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, useLocation, useHistory } from 'react-router-dom';
import '../src/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import RouteApi from './Service/RouteApi';
import HomePage from './HomePage/HomePage';
import { Rings } from 'react-loader-spinner';
import { AuthContext } from './Context/Authenticate-context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Schedule from './HomePage/StudentPage/Schedule';

function App() {
  const [account, setAccount] = useState({});
  const infomt = { stdname: '', MaSV: '' };
  const [userinfo, setuserinfo] = useState(infomt);
  const { authState } = useContext(AuthContext);
  const Pathlocation = useLocation();
  const history = useHistory();
  useEffect(() => {
    let session = sessionStorage.getItem('authState');
    if (session && authState.isAuthenticate) {
      let parsedAccount = JSON.parse(session);
      setAccount(parsedAccount);
      takeinfo();
    }

    if (!authState.isAuthenticate) {
     
      history.push('/Login');
    }
  }, [authState.isAuthenticate, history]);
  const takeinfo = async () => {
    const info = await RouteApi.Leckinfo();
    setuserinfo({
      stdname: info.data.ED.name,
      MaSV: info.data.ED.MaSV
    });
  };
  const RoleID = authState.data.Roleid;
  let location = useLocation();
  const isAuthPage = location.pathname === '/Login' || location.pathname === '/register' ||  location.pathname === '/login';
  return (
    <div className={isAuthPage ? '' : 'App-grid'}>
  <PublicRoutes />
  
  {/* Kiểm tra RoleID */}
  {RoleID && RoleID === "SV" ? (
    <>
      {!isAuthPage && authState.isAuthenticate && <Nav userinfo={userinfo} />}
      <div className='Body-container'>
        {authState.isAuthenticate && authState.isLoading ? (
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
                <StudentPrivateRoutes path={'/Home'} component={HomePage} />
                <StudentPrivateRoutes path={'/Schedule'} component={Schedule} />
              </>
            )}
          </div>
        )}
      </div>
    </>
  ) : (
    <>
      {!isAuthPage && authState.isAuthenticate && <GvNav userinfo={userinfo} />}
      <div className='Body-container'>
        {authState.isAuthenticate && authState.isLoading ? (
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
               
                <StudentPrivateRoutes path={'/Home'} component={HomePage} />
              </>
            )}
          
          </div>
        )}
      </div>
    </>
  )}
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
