import React, {useEffect, useState} from 'react'
import WallClock from './wallclock';

const formatDateTime = (date) => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate}, ${formattedTime}`;
  };
  

const DashboardClock = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Update the date every minute (optional, if you need real-time updates)
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDate(new Date());
      }, 60000); // Update every minute
  
      // Cleanup the timer on component unmount
      return () => clearInterval(timer);
    }, []);

  return (
    <div className='col-span-1 md:col-span-2 my-12 border-[1px] border-borderGrey rounded-[10px] bg-[#FFFFFF]'>
     <p className="font-medium text-xl text-[#1A1817] py-5 px-10"> {formatDateTime(currentDate)}</p>
        <div className=' flex flex-col lg:grid lg:grid-cols-6 w-full justify-between  h-[266px]'>
       <div className='col-span-1 flex flex-col justify-center items-center'>
       <p className='font-medium text-sm text-[#979797]'>Working Hours</p>
       <p className='font-bold text-2xl text-[#000000]'>8 hrs</p>
       </div>
       <div className='col-span-2'>
       <div className='flex flex-col gap-4 w-10/12 mx-auto'>
        <button className='py-2.5 px-10 bg-primaryBlue text-[white] rounded-[10px]'>Clock In</button>
        <button className='py-2.5 px-10 border border-textGrey  rounded-[10px]'>Break</button>
        <button className='py-2.5 px-10 bg-primaryBlue text-[white] rounded-[10px]'>Clock Out</button>
       </div>
       </div>
       <div className='relative md:col-span-3 flex justify-center pr-5' >
       <WallClock/>
       </div>
        </div>
    </div>
  )
}

export default DashboardClock