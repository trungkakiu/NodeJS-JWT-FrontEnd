import React, { createContext, useState, useEffect } from 'react';
import RouteApi from '../Service/RouteApi';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const savedAuthState = sessionStorage.getItem('authState');
    try {
      return savedAuthState
        ? JSON.parse(savedAuthState)  
        : {
            isLoading: true,
            isAuthenticate: false,
            token: null,
            data: {},
          };
    } catch (error) {
      console.error('Error parsing authState from sessionStorage:', error);
      return {
        isLoading: true,
        isAuthenticate: false,
        token: null,
        data: {},
      };
    }
  });
  
  const saveAuthState = (newState) => {
    setAuthState(newState);
    sessionStorage.setItem('authState', JSON.stringify(newState));
    sessionStorage.setItem('Token', newState.token);
  };

  const login = (token, userData) => {
    const newAuthState = {
      isAuthenticate: true,
      token,
      data: userData,
      isLoading: false,
    };
    saveAuthState(newAuthState);
  };

  const logout = () => {
    const newAuthState = {
      isAuthenticate: false,
      token: null,
      data: {},
      isLoading: false,
    };
    setAuthState(newAuthState);
    sessionStorage.clear();
    localStorage.removeItem('currentWeek');
    localStorage.removeItem('scheduleData');
  };

  const AvatarChange = async (newAvatarName) => {
    try {
      // Cập nhật authState trước
      setAuthState((prev) => {
        const updatedState = {
          ...prev,
          data: {
            ...prev.data,
            Avatar: newAvatarName
          }
        };
        return updatedState;
      });

      setTimeout(() => {
        const updatedAuthState = {
          ...authState,
          data: {
            ...authState.data,
            Avatar: newAvatarName
          }
        };
        sessionStorage.setItem('authState', JSON.stringify(updatedAuthState));
      }, 0);
  
    } catch (error) {
      console.error('Error during avatar change:', error);
    }
  };
  
  const fetchUserInfo = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      const info = await RouteApi.Leckinfo();
      if (info?.EC === 0) {
        const userData = info.ED.data;
        userData.Avatar = userData.Avatar;
        saveAuthState({
          isLoading: false,
          isAuthenticate: true,
          token: info.ED.token,
          data: userData,
        });
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    const excludedRoutes = ['/', '/login', '/register'];
    if (!excludedRoutes.includes(window.location.pathname)) {
      fetchUserInfo();
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout ,AvatarChange }}>
      {children}
    </AuthContext.Provider>
  );
};
