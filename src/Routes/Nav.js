import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import beelogo from '../HomePage/Scrourcedata/Beelogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.scss'; 

const Nav = ({ userinfo }) => {
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
        <NavLink to="/">
          <i className='fa-regular fa-chart-bar'> CHBEE DASHBOARD</i>
        </NavLink>
        </div>
        
      </div>

      <div className='student'>
        <img src={beelogo} alt='beelogo' />
        <div className='info flex'>
          <h8 className='Name'>{userinfo.stdname}</h8>
          <small className='MHS'>{userinfo.MaSV}</small>
        </div>
        <div className='setting-student'>
          {/* Các thiết lập hoặc thông tin bổ sung */}
        </div>
      </div>

      <div className='App-menu'>
        <div className='learning-otp'>
          {/* Thêm các menu khác nếu cần */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
