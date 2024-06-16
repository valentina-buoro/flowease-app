import React from "react";
import check from "../../assets/svgs/landingpageSvg/pricingCheck.svg";
import price from "../../assets/svgs/landingpageSvg/priceCheckingTwo.svg";

const Pricing = () => {
  const [show, setShow] = React.useState(true);
  const [free, setFree] = React.useState(false);
  const [basic, setBasic] = React.useState(false);
  const [premium, setPremium] = React.useState(false);
  return (
    <div className="bg-[#fff]">
      <div className="text-center  py-10">
        <p className="text-[#1E1F24] font-bold text-5xl">Flexible Pricing</p>
        <p className="text-[#8E8E93] font-normal text-2xl">
          Choose a plan that fits your team's needs and scale as you grow
        </p>
      </div>
      <div className="flex gap-4 w-9/12  mx-auto justify-center items-center">
        <button
          className={
            show
              ? "text-base font-bold text-primaryBlue border-b border-b-primaryBlue mb-5"
              : " text-base font-bold  mb-5 "
          }
          onClick={() => setShow(true)}
        >
          Monthly
        </button>
        <button
          className={
            !show
              ? "text-base font-bold text-primaryBlue border-b border-b-primaryBlue mb-5"
              : "text-base font-bold  mb-5"
          }
          onClick={() => setShow(false)}
        >
          Annual
        </button>
      </div>
      <div className="w-9/12  mx-auto">
        <div className="grid grid-cols-2 gap-7">
          <div className="col-span-1">
            <div
              className={free ? "rounded-2xl border-2 px-5 py-10 w-11/12 border-primaryBlue text-primaryBlue flex items-center gap-3": "rounded-2xl border py-10 w-11/12 border-[#979797] text-[#979797] flex items-center gap-3 px-5"}
              onClick={() => {
                setFree(true);
                setBasic(false);
                setPremium(false);
              }}
            >
              <div className={free? "bg-primaryBlue rounded-full py-2 px-1.5": "bg-[#979797] rounded-full py-2 px-1.5"}>
                <img src={check} alt="monthly" className="" />
              </div>
              <div>
                <p className="font-bold text-2xl">Free</p>
                <p className="font-normal text-xl">For smaller shops that wants to streamline workflows</p>
              </div>
            </div>
            <div
              className={basic ? " my-5 rounded-2xl border-2 px-5 py-10 w-11/12 border-primaryBlue text-primaryBlue flex items-center gap-3": "my-5 rounded-2xl border py-10 w-11/12 border-[#979797] text-[#979797] flex items-center gap-3 px-5"}
              onClick={() => {
                setFree(false);
                setBasic(true);
                setPremium(false);
              }}
            >
              <div className={basic? "bg-primaryBlue rounded-full py-2 px-1.5": "bg-[#979797] rounded-full py-2 px-1.5"}>
                <img src={check} alt="monthly" className="" />
              </div>
              <div>
                <p className="font-bold text-2xl"> Basic</p>
                <p className="font-normal text-xl">For smaller shops that wants to streamline workflows</p>
              </div>
            </div>
            <div
              className={premium ? "rounded-2xl border-2 px-5 py-10 w-11/12 border-primaryBlue text-primaryBlue flex items-center gap-3": "rounded-2xl border py-10 w-11/12 border-[#979797] text-[#979797] flex items-center gap-3 px-5"}
              onClick={() => {
                setFree(false);
                setBasic(false);
                setPremium(true);
              }}
            >
              <div className={premium? "bg-primaryBlue rounded-full py-2 px-1.5": "bg-[#979797] rounded-full py-2 px-1.5"}>
                <img src={check} alt="monthly" className="" />
              </div>
              <div>
                <p className="font-bold text-2xl">Unlimited</p>
                <p className="font-normal text-xl">For smaller shops that wants to streamline workflows</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="mt-10 flex flex-col items-center">
              <div className="text-center font-bold text-4xl my-4">
             
                {free ? "$0" : basic ? "$150" : "$200"}
              </div>
              <p className="flex items-center gap-1.5">
                <img src={price} alt="price" /> Lorem ipsum dolor sit amet,
                consectetur
              </p>
              <p className="flex items-center gap-1.5">
                <img src={price} alt="price" /> Lorem ipsum dolor sit amet,
                consectetur
              </p>
              <p className="flex items-center gap-1.5">
                <img src={price} alt="price" /> Lorem ipsum dolor sit amet,
                consectetur
              </p>
              <p className="flex items-center gap-1.5">
                <img src={price} alt="price" /> Lorem ipsum dolor sit amet,
                consectetur
              </p>
              <p className="flex items-center gap-1.5">
                <img src={price} alt="price" /> Lorem ipsum dolor sit amet,
                consectetur
              </p>
              <p className="flex items-center gap-1.5">
                <img src={price} alt="price" /> Lorem ipsum dolor sit amet,
                consectetur
              </p>
              <div className="flex items-center justify-center"><button className="bg-primaryBlue  text-[#ffff] rounded-xl py-2.5 px-7  font-bold">
                Choose Plan
              </button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
