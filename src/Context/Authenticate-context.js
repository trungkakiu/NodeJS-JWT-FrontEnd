import React, { createContext, useState, useEffect } from 'react';
import RouteApi from '../Service/RouteApi';
export const AuthContext = createContext({ name: '', auth: false });

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {

    const savedAuthState = sessionStorage.getItem('authState');
    return savedAuthState
      ? JSON.parse(savedAuthState)
      : {
          isLoading: true,
          isAuthenticate: false,
          token: null,
          data: {},
        };
  });

  const login = (token, userData) => {
    const newAuthState = {
      isAuthenticate: true,
      token,
      data: userData,
    };
    setAuthState({...newAuthState,isLoading:false});
    sessionStorage.setItem('authState', JSON.stringify(newAuthState));
  };

  const logout = () => {
    const newAuthState = {
      isAuthenticate: false,
      token: '',
      data: {},
    };
    setAuthState(newAuthState);
    sessionStorage.removeItem('authState');
  };

  const takeinfo = async () => {
    const info = await RouteApi.Leckinfo();
    if(info && info.EC === 0){
      let data = {
        isLoading: false,
        isAuthenticate: true,
        token: info.ED.token,
        data: info.ED.data
      }
      setTimeout(() => {
        
      }, 30 * 1000);
      setAuthState(data);
    }
  };
  
  useEffect(() => {
    takeinfo();
  }, []);

  const getAuthState = () => authState;

  return (
    <AuthContext.Provider value={{ authState, login, logout, getAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
