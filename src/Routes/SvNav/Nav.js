import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import beelogo from '../../HomePage/Scrourcedata/Beelogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.scss'; 
import { AuthContext } from '../../Context/Authenticate-context';
import Userinfo from '../NavModal/Userinfo';
import RouteApi from '../../Service/RouteApi';
import { toast } from 'react-toastify';

const Nav = () => {
  let history = useHistory();
  const { authState, logout, saveAuthState } = useContext(AuthContext);
  const [modalUp, setModalUp] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [avatarUser, setAvatarUser] = useState(authState.data.Avatar);
  


  const data = {
    Username: authState.data.name,
    UserAvatar: authState.data.Avatar,
    Useremail: authState.data.email,
    MSV: authState.data.MaSV,
    Roleid: authState.data.Roleid
  };

  const openModal = () => {
    setModalUp(true);
    setDataModal(data);
  };

  const closeModal = async (newAvatarUrl) => {
    setModalUp(false);
    setDataModal({});
  };

  const handleLogout = async () => {
    try {
      logout();
      const response = await RouteApi.LogoutRequest();
      if (response && response.EC === 0) {
        toast.success("Log out success!");
        history.push('/login');
      } else {
        toast.error(response.ED);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (authState.data.Avatar) {
      setAvatarUser(authState.data.Avatar);
    }
  }, [authState.data.Avatar]);
  const userAvatarUrl = `http://localhost:8081/UserAvatar/${avatarUser}`;
  return (
    <div className='left-content shadow-sm'>
      <div className='App-Header'>
        <div className='logo'>
          <img src={beelogo} alt='beelogo' />
        </div>
        <div className='Version'>
          <p>Version V0.0.1</p>
        </div>
      </div>
      <div className='App-dashboard'>
        <div className='children-dashboard' activeClassName="active">
          <NavLink to="/Home">
            <i className='fa-regular fa-chart-bar'> STDBEE DASHBOARD</i>
          </NavLink>
        </div>
      </div>
    
      <div className='student'>
        <img src={userAvatarUrl || avatarUser} alt='User Avatar' />
        <div className='info-container'>
          <div className='info flex'>
            <div onClick={openModal} className='top-statement'>
              <h8 className='Name'>{authState.data.name}</h8>
              <small className='MHS'>{authState.data.MaSV}</small>
            </div>
            <div>
              <i onClick={openModal} className="icon fa-regular fa-pen-to-square"></i>
            </div>
          </div>
       </div>
      </div>

      <div className='App-menu'>
        <div className='learning-otp'>
          <div className='Hoc-Tap'>
            <p>Học Tập</p>
            <NavLink 
              to="/Schedule" 
              className="Schedule" 
              style={{ textDecoration: 'none'}} 
              activeClassName="active"
            >
              <div>
                <i className="fa-solid fa-calendar-days"></i>
                <span>Thời Khóa Biểu</span>
              </div>
            </NavLink>
          </div>
          <div className='Ket-Qua'></div>
          <div className='He-Thong'>
            <p>Hệ Thống</p>
            <span className='logout-span' onClick={handleLogout}>
              <div className='logout-contents'>
                <i className="fa-solid fa-right-from-bracket"></i>
                Đăng xuất
              </div>
            </span>
          </div>
        </div>
      </div>
    
      <Userinfo
        show={modalUp}
        closeModal={closeModal}
        userdata={dataModal}
      />
    </div>
  );
};

export default Nav;
