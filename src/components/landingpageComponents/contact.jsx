import React from "react";
import dashboard from "../../assets/images/landingpageImages/dashboardPicture.png";

const Contact = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4 mx-auto mt-10">
        <div className="col-span-7 flex flex-col items-center justify-center">
          <div className=" w-[494px]">
          <p className="font-bold text-5xl">
            Start Optimizing Your Performance <span className="text-primaryBlue">Today!</span>
          </p>
          <button className="bg-primaryBlue  text-[#ffff] rounded-2xl py-2.5 px-7  font-bold">
            Create Project
          </button>
          </div>
        </div>
        <div className="col-span-5">
          <img src={dashboard} alt="dashboard" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
