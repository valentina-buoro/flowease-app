import React from "react";

const Productivity = () => {
  return (
    <div className="h-[350px] bg-[white] p-6 rounded-lg border border-[#FAF2F]">
      <p className="font-medium text-xl text-[#1A1817]">Productivity</p>
      <div>
        <div className="w-full flex gap-2.5">
          <div className=" w-1/2 border rounded-md py-2 pl-3 flex flex-col gap-1.5">
            <p className="text-xs text-[#979797] font-bold">Today's Productivity</p>
            <p className="text-xs flex items-end">
              10/8 <span className='text-primaryGreen text-[10px] ml-2'>+55%</span>
            </p>
          </div>
          <div className=" w-1/2 border rounded-md py-2 pl-3 flex flex-col gap-1.5">
            <p className="text-xs text-[#979797] font-bold">Today's Productivity</p>
            <p className="text-xs flex items-end">
              10/8 <span className='text-primaryGreen text-[10px] ml-2'>+55%</span>
            </p>
          </div>
        </div>
        <div className="w-full flex gap-2.5 mt-2.5">
          <div className=" w-1/2 border rounded-md py-2 pl-3 flex flex-col gap-1.5">
            <p className="text-xs text-[#979797] font-bold">Today's Productivity</p>
            <p className="text-xs flex items-end">
              10/8 <span className='text-primaryGreen text-[10px] ml-2'>+55%</span>
            </p>
          </div>
          <div className=" w-1/2 border rounded-md py-2 pl-3 flex flex-col gap-1.5">
            <p className="text-xs text-[#979797] font-bold">Today's Productivity</p>
            <p className="text-xs flex items-end">
              10/8 <span className='text-primaryGreen text-[10px] ml-2'>+55%</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="font-medium text-xl text-[#1A1817]">Today's Task</p>
      </div>
    </div>
  );
};

export default Productivity;
