import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../../utilComponents/table";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaAsterisk } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const URL = "https://flowease.onrender.com/api";
  const { id } = useParams();
  const [show, setShow] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  console.log(id);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("login_token");
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://flowease.onrender.com/api/projects/${id}/project`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(data);
        setProjectDetails(data.message);
        console.log("assigned", data.message);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [id]);

  const data = [
    {
      id: 1,
      email: "valentina@yahoo.com",
      phone: "9876543210",
      status: "active",
      created_at: "2021-08-09T12:12:12.000Z",
    },
    {
      id: 2,
      email: "valentina@yahoo.com",
      phone: "9876543210",
      status: "active",
      created_at: "2021-08-09T12:12:12.000Z",
    },
    {
      id: 3,
      email: "valentina@yahoo.com",
      phone: "9876543210",
      status: "active",
      created_at: "2021-08-09T12:12:12.000Z",
    },
    {
      id: 4,
      email: "valentina@yahoo.com",
      phone: "9876543210",
      status: "active",
      created_at: "2021-08-09T12:12:12.000Z",
    },
  ];

  const columns = [
    { header: "S/N", accessor: "id" },
    { header: "Email Address", accessor: "email" },
    { header: "Status", accessor: "status" },
    { header: "Due Date", accessor: "created_at" },
  ];

  const navigate = useNavigate();
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [task, setTask] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    collaborators: "",
    
  });


  const [dueDateTimestamp, setDueDateTimestamp] = useState(null);

  const [showing, setShowing] = useState(false);

  const showBudget = () => {
    setShowing(true);
  };
  const closeBudget = () => {
    setShowing(false);
  };

  

  const handleAddTodo = async () => {
    setBudgets([...budgets, task]);
    const token = localStorage.getItem("login_token");
    const data = {
      name: task.name,
      description: task.description,
      due_date: dueDateTimestamp,
      collaborator: task.collaborators,
    };
    setLoading(true);
    try {
      const res = await axios.post(`${URL}/milestones/${id}/create`, data, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.data.success === true) {
        setLoading(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTask({
          name: "",
          description: "",
          start_date: "",
          end_date: "",
          collaborators: [""],
        });
        navigate(`/projects/project-details/${id}`);
      } else {
        setLoading(false);
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("task", data);
    }
  };

  return (
    <div className="px-4 md:px-11  w-full">
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-secondaryGrey ">Menu</span>

          <IoIosArrowRoundForward className="text-[#696969]" size={30} />

          <span className="text-[#696969]">Projects</span>
          <IoIosArrowRoundForward className="text-[#696969]" size={30} />

          <span className="text-textBlack">Project details</span>
        </div>
        {show ? (
          <div className="flex">
            <button className="bg-primaryBlue w-full text-[#ffff] rounded-2xl py-3 px-7  font-bold">
              Create Project
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex gap-4">
        <button
          className={
            show
              ? "text-xl font-bold text-primaryBlue border-b border-b-primaryBlue mb-5"
              : " text-xl font-bold  mb-5 "
          }
          onClick={() => setShow(true)}
        >
          Overview
        </button>
        <button
          className={
            !show
              ? "text-xl font-bold text-primaryBlue border-b border-b-primaryBlue mb-5"
              : "text-xl font-bold  mb-5"
          }
          onClick={() => setShow(false)}
        >
          Tasks
        </button>
      </div>

      {show ? (
        <div className="">
          <div className="flex justify-between items-center w-10/12 py-8 pl-8 pr-28 bg-[#ffffff] shadow-lg">
            <div className="flex justify-between gap-16 items-center">
              <p className="text-lg font-medium text-[#1B1D21]">
                {projectDetails.name}
              </p>
              <div className="flex justify-between gap-16">
                <div className="flex flex-col gap-2 ">
                  <span className="text-[#979797] text-xs">Task</span>
                  <span className="text-[#1A1817] text-xs font-medium text-center">
                    {projectDetails ? projectDetails?.milestones : ""}
                  </span>
                </div>
                <div className="flex flex-col gap-2 ">
                  <span className="text-[#979797] text-xs">Start Date</span>
                  <span className="text-[#1A1817] text-xs font-medium">
                    01, Feb 2024
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#979797] text-xs">Due Date</span>
                  <span className="text-[#1A1817] text-xs font-medium">
                    20, Feb 2024
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#979797] text-xs">Status</p>
              <span>Ongoing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6 mt-10">
            <div className="col-span-1 md:col-span-2">
              <div className="p-6 bg-[#ffffff] shadow-lg min-h-36 ">
                <p className="text-[#1A1817] font-medium">Description</p>
                <p>{projectDetails.description}</p>
              </div>
              <div className="p-6 bg-[#ffffff] shadow-lg mt-5">
                <p className="text-[#1A1817] font-medium">Members</p>
                {projectDetails ?(
                  projectDetails?.collaborators?.map((member, index) => (
                    <div className="flex gap-3 items-center" key={index}>
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=${member}&background=0979A1&color=fff`}
                          alt="profile"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <p className="text-[#1A1817] font-medium">{member}</p>
                      </div>
                    </div>
                  ))) : null}
              </div>
            </div>
            <div className="col-span-1 bg-[#ffffff] shadow-lg p-6 min-h-[538px]">
              <p>Recent Activities</p>
              <ul className="list-disc">
                <li>
                  Task one <br /> this task is added to the list
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div></div>
          <div className="flex justify-between items-center ">
            <div className="border-1 rounded-md  pl-5 bg-transparent  h-[40px] flex gap-3">
              <input
                className="outline-none border-none w-[80%] bg-transparent"
                id="input-placeholder"
                placeholder="Search"
                value={""}
                onChange={(e) => {}}
              />
            </div>
            <button
              className="bg-primaryBlue text-[#ffff] rounded-2xl py-3 px-7  font-bold"
              onClick={showBudget}
            >
              Add New Task
            </button>
          </div>
          <Table columns={columns} data={data} />

          <Modal
            isOpen={showing}
            onClose={closeBudget}
            onAdd={handleAddTodo}
            className="w-screen md:w-3/5 mx-auto bg-[#fff] border bg-opacity-100 rounded-2xl py-10 mt-5 "
          >
            <div className="flex flex-col gap-4 px-14">
              <div className="flex justify-between">
                <div className="text-3xl text-left text-[#020202] font-bold">
                  Add New Task
                </div>
                <div
                  onClick={closeBudget}
                  className="flex justify-end bg-secondaryGrey/10 rounded-lg"
                >
                  <IoCloseOutline className="font-bold" size={30} />
                </div>
              </div>
              <div className="mb-4 md:mb-6">
                <label
                  className="font-medium text-base md:text-[18px] text-[#0D0D0D] mb-2 flex"
                  htmlFor="title"
                >
                  Task Name <FaAsterisk className="text-[red]" size={7} />
                </label>
                <div className="flex justify-between p-2 md:p-4 w-full rounded-lg border border-[#E7E7E7] ">
                  <input
                    className="bg-inherit w-full border-none outline-none placeholder:text-sm"
                    placeholder="e.g. Website Design"
                    id="name"
                    name="name"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="mb-4 md:mb-6">
                <label
                  className="font-medium text-base md:text-[18px] text-[#0D0D0D] mb-2 flex"
                  htmlFor="title"
                >
                  Description <FaAsterisk className="text-[red]" size={7} />
                </label>
                <div className="flex justify-between p-2 md:px-4 md:py-8 w-full rounded-lg border border-[#E7E7E7] ">
                  <input
                    className="bg-inherit w-full border-none outline-none placeholder:text-sm"
                    placeholder="e.g. Website Design"
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={(e) =>
                      setTask({ ...task, description: e.target.value })
                    }
                  />
                </div>
              </div>
           
                
                <div className="mb-4 md:mb-6 ">
                  <label
                    className="font-medium text-base md:text-[18px] text-[#0D0D0D] mb-2 flex"
                    htmlFor="end_date"
                  >
                    Due Date <FaAsterisk className="text-[red]" size={7} />
                  </label>
                  <div className="flex justify-between p-2 md:p-4 w-full rounded-lg border border-[#E7E7E7] ">
                    <input
                      className="bg-inherit w-full border-none outline-none placeholder:text-sm"
                      placeholder="e.g. Website Design"
                      type="date"
                      id="end_date"
                      name="end_date"
                      value={task.end_date}
                      onChange={(e) => {
                        setTask({ ...task, end_date: e.target.value });
                        const dueUnixTimestamp = new Date(
                          e.target.value
                        ).getTime();
                        setDueDateTimestamp(dueUnixTimestamp);
                      }}
                    />
                  </div>
          
              </div>
              <div className="mb-4 md:mb-6">
              <label
                    className="font-medium text-base md:text-[18px] text-[#0D0D0D] mb-2 flex"
                    htmlFor="collaborators"
                  >
                    Assignee <FaAsterisk className="text-[red]" size={7} />
                  </label>
                <div className="flex justify-between p-2 md:p-4 w-full rounded-lg border border-[#E7E7E7] ">
                  <input
                    className="bg-transparent w-full border-none outline-none placeholder:text-sm"
                    placeholder="e.g. Website Design"
                    id="collaborators"
                    name="collaborators"
                    value={task.collaborators}
                    onChange={(e) =>
                      setTask({ ...task, collaborators: e.target.value })
                    }
                  
                  />
                </div>

                
                
              </div>

              <button
                onClick={handleAddTodo}
                className="py-4 px-3 bg-primaryBlue rounded-md text-[white]"
              >
                {loading ? "Creating Task..." : "Add Task"}
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
