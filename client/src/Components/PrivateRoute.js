import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {
    const userInfo = useSelector((state)=>state.auth.userInfo);
  return (
    //replace remove previous history back button won't work
    userInfo ? <Outlet/> : <Navigate to={'/'} replace/>
  )
}

export default PrivateRoute
