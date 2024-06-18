import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from '../utilComponents/table';
import { IoIosArrowRoundForward } from 'react-icons/io';

const TaskComponent = () => {
   // const URL = "https://flowease.onrender.com/api";
  const { id } = useParams();
  const [show, setShow] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  console.log(id, show, loading, projectDetails, setShow);


  const columns = [
    { header: "S/N", accessor: "_id" },
    {header:"Task Name", accessor: "name"},
    {header:"Due Date", accessor: "due_date"},
    { header: "Assigned To", accessor: "collaborator" },
    { header: "Status", accessor: "status"  },
    {header: "Action", accessor: "action"}
   
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("login_token");
     // const params = { projectName: 'pipeops' };
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://flowease.onrender.com/api/milestones`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(data);
        setProjectDetails(data.message);
        console.log("assigned task", data.message);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [id]);
  return (
    <div className='px-4 md:px-11  w-full'>
      <div className="flex items-center">
          <span className="text-secondaryGrey ">Menu</span>

          <IoIosArrowRoundForward className="text-[#696969]" size={30} />

          <span className="text-textBlack">Projects</span>
        </div>
       <Table columns={columns} data={projectDetails} />
    </div>
  )
}

export default TaskComponent