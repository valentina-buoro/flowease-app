import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table from "../utilComponents/table";
import { IoIosArrowRoundForward } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskComponent = () => {
  // const URL = "https://flowease.onrender.com/api";
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [createdProjectName, setCreatedProjectName] = useState([]);
  const [assignedProjectName, setAssignedProjectName] = useState([]);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  



  const columns = [
    { header: "S/N", accessor: "_id" },
    { header: "Task Name", accessor: "name" },
    { header: "Due Date", accessor: "due_date" },
    { header: "Assigned To", accessor: "collaborator" },
    { header: "Status", accessor: "status" },
    { header: "Action", accessor: "action" },
  ];

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

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("login_token");
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://redundant-discussion-zesty-star-production.pipeops.app/api/milestones`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setProjectDetails(data.message);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [selectedProjectName, id]);



  const handleProjectNameChange = (event) => {
    setSelectedProjectName(event.target.value);
  };
  return (
    <div className="px-4 md:px-11  w-full">
      <div className="flex items-center">
        <span className="text-secondaryGrey ">Menu</span>

        <IoIosArrowRoundForward className="text-[#696969]" size={30} />

        <span className="text-textBlack">Projects</span>
      </div>
      <div className="mt-4">
        <select className="border  px-4 py-2.5 rounded bg-[#fff] text-center font-semibold" value={selectedProjectName} onChange={handleProjectNameChange}>
          <option value="">Projects Name</option>
          {assignedProjectName.map((role) => (
            <option value={role.name}>{role.name}</option>
          ))}
          {createdProjectName.map((role) => (
            <option value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>
      <div className=" bg-[#EDEDEE] border border-[#EDEDEE] rounded-md  pl-3 bg-transparent w-[300px] h-[40px] mt-4">
        <input
          className="outline-none border-none w-full bg-transparent"
          id="input-placeholder"
          placeholder="Search by task name"
          value={""}
          onChange={(e) => {}}
        />
      </div>
      
      <Table columns={columns} data={projectDetails} />
    </div>
  );
};

export default TaskComponent;
