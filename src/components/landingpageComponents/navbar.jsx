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

          <div className="basis-1/2 flex justify-end gap-x-4 text-base font-bold text-[#1A1817] hover:text-primaryBlue">
            <a href="#features" className="block no-underline text-[#1A1817] hover:text-primaryBlue">
              
                Features
            
            </a>
            <a href="#pricing" className="block no-underline text-[#1A1817] hover:text-primaryBlue">
             
                Pricing
          
            </a>

            <a href="#contact-us" className=" block no-underline text-[#1A1817] hover:text-primaryBlue">
           
               Contact Us
            
            </a>
          </div>

          <div className="basis-1/2 flex justify-end gap-x-4">
            <Link to="/login" className="hidden sm:block">
              <button className="px-12 text-primaryGreen text-base h-[40px] font-bold">
                Sign In
              </button>
            </Link>

            <Link to="/signup" className="hidden sm:block">
              <button className="px-12 rounded-xl bg-primaryGreen text-white h-[40px] text-base font-bold ">
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
