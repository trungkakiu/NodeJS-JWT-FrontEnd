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
      isLoading: false, 
    };
    setAuthState(newAuthState);
    sessionStorage.setItem('authState', JSON.stringify(newAuthState));
    sessionStorage.setItem('Token', newAuthState.token);
  };

  const logout = () => {
    const newAuthState = {
      isAuthenticate: false,
      token: '',
      data: {},
      isLoading: false,
    };
    setAuthState(newAuthState);
    sessionStorage.removeItem('authState');
  };

  const takeinfo = async () => {
  
    setAuthState((prevState) => ({ ...prevState, isLoading: true }));
      const info = await RouteApi.Leckinfo();
      if (info && info.EC === 0) {
        const data = {
          isLoading: false, 
          isAuthenticate: true,
          token: info.ED.token,
          data: info.ED.data,
        };
        setAuthState(data);
      } else {
        setAuthState((prevState) => ({ ...prevState, isLoading: false }));
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
