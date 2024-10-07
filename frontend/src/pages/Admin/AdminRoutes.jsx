import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo)
  return (
    userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />
  )
}

export default AdminRoutes