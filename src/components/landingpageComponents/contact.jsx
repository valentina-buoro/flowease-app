import React from "react";
import dashboard from "../../assets/images/landingpageImages/dashboardPicture.png";

const Contact = () => {
  return (
    <div id='contact-us'>
      <div className="grid grid-cols-12 gap-4 mx-auto mt-10">
        <div className="col-span-7 flex flex-col items-center justify-center">
          <div className=" w-[494px]">
            <p className="font-bold text-5xl">
              Start Optimizing Your Performance{" "}
              <span className="text-primaryBlue">Today!</span>
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
      <div className="text-center mt-14 mb-10">
        <p className="text-[#1E1F24] font-bold text-5xl">We're Here to Help</p>
        <p className="text-[#8E8E93] font-normal text-2xl">
          Have a question, comment, or need support?
        </p>
      </div>
      <div className="grid grid-cols-7 gap-4 mx-auto my-10">
        <form className="col-span-4">
          <div className="bg-white shadow-lg rounded-[10px] w-9/12 mx-auto p-5">
          <p className="text-primaryBlue text-4xl font-bold">Get In Touch</p>
            <div className="flex flex-col gap-2">
              <label>Name</label>
              <input className="border border-[#979797] outline-none py-2.5 px-1 rounded-[10px]"/>
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input className="border border-[#979797] outline-none py-2.5 px-1 rounded-[10px]"/>
            </div>
            <div className="flex flex-col gap-2">
              <label>Message</label>
              <textarea className="border border-[#979797] outline-none py-2.5 px-1 rounded-[10px]"/>
            </div>
            <div className="flex items-center justify-start mt-4"><button className="bg-primaryBlue  text-[#ffff] rounded-xl py-2.5 px-7  font-bold">
                Submit
              </button></div>
          </div>
        </form>
        <div className="col-span-3">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">
                Email:
                <span className="font-medium text-[#8E8E93]">
                  {" "}
                  mailto:support@example.com
                </span>
              </p>
              <p className="font-bold text-xl">
              Phone:
                <span className="font-medium text-[#8E8E93]">
                  {" "}
                  +2348012345678
                </span>
              </p>
              <p className="font-bold text-xl">
              Address:
                <span className="font-medium text-[#8E8E93]">
                  {" "}
                123 Main St, Anytown, Nigeria 12345
                </span>
              </p>
            </div>
            <div>Social media</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
