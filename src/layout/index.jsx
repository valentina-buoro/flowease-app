import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/utilComponents/navbar'
import TopNavbar from '../components/utilComponents/topNavbar'

const DashboardLayout = () => {
  return (
   <>
    <Navbar />
    <div className="md:ml-64  bg-[#F7F7F7] h-screen overflow-scroll">
      <TopNavbar  />
     <Outlet />
    </div></>
  )
}

export default DashboardLayout 