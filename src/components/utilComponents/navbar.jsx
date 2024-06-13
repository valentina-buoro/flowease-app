import React from "react";
import Logo from "../../assets/svgs/logo.svg";
import { NavLink } from "react-router-dom";
import {
  TbLayoutDashboard,
  TbCube,
  TbClock,
  TbMessageCircle,
  TbSettings,
  TbChartHistogram,
  TbListCheck,
} from "react-icons/tb";

const dashboardRoutes = [
  {
    icon: <TbLayoutDashboard size={20} />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <TbCube size={20} />,
    label: " Projects",
    href: "/projects" ,
  },
  {
    icon: <TbListCheck size={20} />,
    label: "Tasks",
    href: "/tasks",
  },
  {
    icon: <TbClock size={20} />,
    label: "Clock",
    href: "/clock",
  },
  {
    icon: <TbMessageCircle size={20} />,
    label: "Chat",
    href: "/chat",
  },
  {
    icon: <TbChartHistogram />,
    label: "Reports",
    href: "/reports",
  },
  {
    icon: <TbSettings size={20} />,
    label: "Settings",
    href: "/settings",
  },
];

const Navbar = () => {
  return (
    <nav className="hidden md:flex flex-col bg-primaryBlue h-full md:w-64 fixed top-0 left-0 overflow-y-auto shadow-sm px-4 md:px-10">
      <div className="flex items-center justify-center mt-8 mb-14">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex flex-col gap-y-6 items-start mt-9 ">
        {dashboardRoutes.map((route, index) => {
          return (
            <NavLink
              to={route.href}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#fff] rounded-[10px] text-primaryBlue py-3 px-7 flex flex-row items-center gap-x-4 w-full no-underline"
                  : "flex flex-row items-center gap-x-6 w-full py-2.5 px-4 text-[#fff] no-underline "
              }
            >
              {route.icon}
              <span className=" hidden md:block font-normal text-base ">
                {route.label}
              </span>
            </NavLink>
          );
        })}
      </div>

  
    </nav>
  );
};

export default Navbar;
