import React from 'react'
import Cookies from 'js-cookie'
import {Navigate,Outlet} from 'react-router-dom';


const ProtectedRoutes = () => {
    const jwt_token = Cookies.get('jwt_token');
    if(!jwt_token) {
        return <Navigate to="/login"/>
    }

  return <Outlet/>
}

export default ProtectedRoutes
