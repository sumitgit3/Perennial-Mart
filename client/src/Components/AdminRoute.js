import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const AdminRoute = () => {
    const userInfo = useSelector((state)=>state.auth.userInfo);
  return (
    //replace remove previous history back button won't work
    userInfo && userInfo.isAdmin ?  <Outlet/> : <Navigate to={'/'} replace/>
  )
}

export default AdminRoute
