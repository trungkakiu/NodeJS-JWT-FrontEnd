import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import beelogo from '../../HomePage/Scrourcedata/Beelogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GvNav.scss'; 
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Authenticate-context';
import Userinfo from '../NavModal/Userinfo';




const Nav = ({ userinfo }) => {
  const { authState } = useContext(AuthContext);
  const [modalUp, setmodalUp] = useState(false);
  const [datamodal, setdatamodal] = useState({});
  const data = {
    Username: authState.data.name,
    UserAvatar: '',
    Useremail: authState.data.email,
    MSV: authState.data.MaSV,
    Roleid: authState.data.Roleid
  }

  const openmodal = () =>{
      setmodalUp(true);
      setdatamodal(data);
  }
  const closeModal = () => {
    setmodalUp(false);
    setdatamodal({});
  }
  
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
        <div  className='children-dashboard' activeClassName="active">
        <NavLink to="/Home">
          <i className='fa-regular fa-chart-bar'> TEABEE DASHBOARD</i>
        </NavLink>
        </div>
      </div>
      <div className='student'>
        <img src={beelogo} alt='beelogo' />
        <div className='info-container'>
          <div className='info flex'>
            <div onClick={()=>openmodal()} className='top-statement'>
              <h8 className='Name'>{authState.data.name}</h8>
              <small className='MHS'>{authState.data.MaSV}</small>
            </div>
            <div>
              <i  onClick={()=>openmodal()} className="icon fa-regular fa-pen-to-square"></i>
            </div>
          </div>
       </div>
      <div className='setting-student'>
      </div>
    </div>

    <div className='App-menu'>
      <div className='learning-otp'>
        
      </div>
    </div>
    <Userinfo
      show={modalUp}
      closeModal={closeModal}
      userdata= {datamodal}
    />
  </div>
  
  );
};

export default Nav;
