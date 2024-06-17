import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/utilComponents/navbar";
import TopNavbar from "../components/utilComponents/topNavbar";

const DashboardLayout = () => {
  return (
    <>
      <div className=" text-primaryBlue font-bold text-2xl flex items-center justify-center bg-[#E9EDFF] h-screen  md:hidden">
        {" "}
        <p className="px-7 py-10">
          Hi there 👋🏼, access to flowease is currently limited to laptops and
          desktops. Please view the application on any of the aforementioned
          devices. <br /> <br /> Thank you, <br />
          <span className="italic">The Flowease Team.</span>
        </p>
      </div>
      <Navbar />
      <div className="hidden md:block md:ml-64  bg-[#F7F7F7] h-screen overflow-scroll">
        <TopNavbar />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
