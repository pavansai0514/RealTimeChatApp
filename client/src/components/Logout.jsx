// /src/components/Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../services/authService';
import { logout as logoutRedux } from '../store/authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();  // Clear token from localStorage
    dispatch(logoutRedux());  // Clear user data in Redux
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
