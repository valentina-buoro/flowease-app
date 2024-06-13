import React, {useEffect, useState} from 'react'
import Notifications from '../../assets/svgs/notifications.svg'


const TopNavbar = () => {

  const [data, setData] = useState(null);
  const [email, setEmail] = useState(null)
  useEffect(() => {
    // Retrieve data from local storage
    const full_name = localStorage.getItem("full_name");
    const email = localStorage.getItem("email");
    if (full_name) {
      setData(full_name);
    }
    if(email){
      setEmail(email)
    }
  }, []); 
  return (
    <> 
      <div className="flex flex-row justify-between items-center p-4 md:px-11 md:py-4 bg-[#FFFFFF] mb-5 ">
        <div className="flex flex-col items-start">
          <span className="font-semibold text-lg  text-[#020202] mb-2">
            Hello {data} &#128075;
          </span>
        </div>
        <div className="flex flex-row gap-x-8 items-center">
          <div className={''}>
            <img src={Notifications} alt={"notification"} />
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <div className="flex  justify-center items-center rounded-full">
              <img
                src={`https://ui-avatars.com/api/?name=${data}&background=0979A1&color=fff`}
                alt="profile"
                className='rounded-full'
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-x-1">
              <span className="text-base  font-medium">{data}</span>
              <span className="text-xs md:text-sm text-[#000000]/70">
                {email}
              </span>
            </div>
          </div>
        </div>
      </div>
      </>
      
  );
}

export default TopNavbar