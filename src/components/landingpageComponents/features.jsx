import React from "react";
import featuresOne from "../../assets/svgs/landingpageSvg/featuresOne.svg";
import featuresTwo from "../../assets/svgs/landingpageSvg/featuresTwo.svg";
import featuresThree from "../../assets/svgs/landingpageSvg/featuresThree.svg";

const Features = () => {
  return (
    <div className="bg-[#F3F6FF]">
      <div className="text-center  py-10">
        <p className="text-[#1E1F24] font-bold text-5xl">Features</p>
        <p className="text-[#8E8E93] font-normal text-2xl">
          Streamline Your Workflow and Boost Productivity
        </p>
      </div>
      <div className="max-w-[887px] grid grid-cols-2 gap-4 mx-auto mt-10">
        <div className="col-span-1 ">
          <div className="flex flex-col gap-5 h-[626px]">
          <div className="bg-[#FFFFFF] rounded-2xl p-10 w-11/12 ">
            <div className="flex justify-center">
              <img src={featuresOne} alt="features-one" />
            </div>
            <p className="text-center font-bold text-[#1E1F24] py-4">Track Individual and Team Performance</p>
            <p className="font-normal text-sm text-[#444750] text-center">Monitor progress, completed tasks, and upcoming milestones in one place</p>
          </div>
          <div className="bg-[#FFFFFF] rounded-2xl p-10 ml-auto w-11/12 ">
            <div className="flex justify-center">
              <img src={featuresTwo} alt="features-one" />
            </div>
            <p className="text-center font-bold text-[#1E1F24] py-4">Work-Hour Tracking and Break Reminders</p>
            <p className="font-normal text-sm text-[#444750] text-center">Stay focused and avoid burnout with automated work-hour tracking and periodic break prompts.</p>
          </div>
          </div>
        </div>
        <div className="col-span-1 ">
          <div className="flex flex-col mt-5 gap-5 h-[626px]">
          <div className="bg-[#FFFFFF] rounded-2xl p-10 w-11/12 ">
            <div className="flex justify-center">
              <img src={featuresThree} alt="features-one" />
            </div>
            <p className="text-center font-bold text-[#1E1F24] py-4">Integrations with Popular Productivity Tools</p>
            <p className="font-normal text-sm text-[#444750] text-center">Seamlessly connect with tools like Trello, Asana, and Google Calendar.</p>
          </div>
          <div className="bg-[#FFFFFF] rounded-2xl p-10 ml-auto w-11/12">
            <div className="flex justify-center">
              <img src={featuresThree} alt="features-one" />
            </div>
            <p className="text-center font-bold text-[#1E1F24] py-4">Customizable Dashboards and Reports</p>
            <p className="font-normal text-sm text-[#444750] text-center">Visualize your data and generate actionable insights with ease.</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
