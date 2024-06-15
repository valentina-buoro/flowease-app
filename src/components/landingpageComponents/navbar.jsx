import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/svgs/logo.svg'

const Navbar = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto py-6 px-4 relative z-50">
        <div className="flex justify-between items-center cursor-pointer">
          <Link
            to={"/"}
            className="w-[300px] md:w-[180px] h-[10px] md:h-[15px] flex items-center"
          >
            <img src = {Logo} alt = "logo" />
          </Link>

          <div className="basis-1/2 flex justify-end gap-x-4">
            <Link to="/about" className="hidden sm:block">
              <button className=" text-[14px] font-medium hidde sm:blck">
                Features
              </button>
            </Link>
            <Link to="/about" className="hidden sm:block">
              <button className=" text-[14px] font-medium hidde sm:blck">
                Pricing
              </button>
            </Link>

            <Link to="/pricing" className="hidden sm:block">
              <button className="text-[14px] font-medium px-8 hidde sm:blck">
               Contact Us
              </button>
            </Link>
          </div>

          <div className="basis-1/2 flex justify-end gap-x-4">
            <Link to="/login" className="hidden sm:block">
              <button className="px-12 text-primaryGreen text-[12px] h-[40px] font-bold">
                Sign In
              </button>
            </Link>

            <Link to="/signup" className="hidden sm:block">
              <button className="px-12 rounded-xl bg-primaryGreen text-white h-[40px] text-[12px] font-bold ">
                Get Started
              </button>
            </Link>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Navbar;
