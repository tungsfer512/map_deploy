import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authSelector } from '../store/reducers/authSlice';

const ProtectedRoutes = () => {
    const auth = localStorage.getItem('user');
    // console.log(auth);
    const isAuthenticated = auth ? true : false;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;

