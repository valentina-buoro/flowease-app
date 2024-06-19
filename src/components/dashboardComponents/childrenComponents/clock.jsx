import React, {useEffect, useState} from 'react'
import WallClock from './wallclock';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const formatDateTime = (date) => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate}, ${formattedTime}`;
  };
  

const DashboardClock = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    console.log(loading)
  const [createdProjectName, setCreatedProjectName] = useState([]);
  const [assignedProjectName, setAssignedProjectName] = useState([]);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  

    // Update the date every minute (optional, if you need real-time updates)
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentDate(new Date());
      }, 60000); // Update every minute
  
      // Cleanup the timer on component unmount
      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      const fetchProjectName = async () => {
        const token = localStorage.getItem("login_token");
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://redundant-discussion-zesty-star-production.pipeops.app/api/projects/list",
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
      
          setAssignedProjectName(data.message.assigned_projects);
          setCreatedProjectName(data.message.created_projects);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      };
      fetchProjectName();
    }, []);

    const handleStatusChange = (event) => {
      setSelectedProjectName(event.target.value);
    };

    const handleClockIn = async () => {
      const token = localStorage.getItem("login_token");
      try {
        const { data } = await axios.post(
          `https://redundant-discussion-zesty-star-production.pipeops.app/api/clockings/clockin`,
          {
            project_id: selectedProjectName,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

  return (
    <div className='col-span-1 md:col-span-2 my-12 border-[1px] border-borderGrey rounded-[10px] bg-[#FFFFFF]'>
       
     <p className="font-medium text-xl text-[#1A1817] pt-5 px-10"> {formatDateTime(currentDate)}</p>
     <div className="mb-4 ml-4">
        <select className="border  px-4 py-2.5 rounded bg-[#fff] text-center font-semibold" value={selectedProjectName} onChange={handleStatusChange} >
          <option value="">Projects Name</option>
          {assignedProjectName.map((role) => (
            <option value={role._id} key={role._id}>{role.name}</option>
          ))}
          {createdProjectName.map((role) => (
            <option value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>
        <div className=' flex flex-col lg:grid lg:grid-cols-6 w-full justify-between  h-[266px]'>
       <div className='col-span-1 flex flex-col justify-center items-center'>
       <p className='font-medium text-sm text-[#979797]'>Working Hours</p>
       <p className='font-bold text-2xl text-[#000000]'>8 hrs</p>
       </div>
       <div className='col-span-2'>
       <div className='flex flex-col gap-4 w-10/12 mx-auto'>
        <button className='py-2.5 px-10 bg-primaryBlue text-[white] rounded-[10px]' onClick={handleClockIn} >Clock In</button>
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