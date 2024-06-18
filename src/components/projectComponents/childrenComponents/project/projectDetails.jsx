import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../../../utilComponents/table";
import Modal from "react-modal";
import { formatISODate } from "../../../utilComponents/formatDate";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaAsterisk } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const URL = "https://redundant-discussion-zesty-star-production.pipeops.app/api";
  const { id } = useParams();
  const [show, setShow] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectStatus, setProjectStatus] = useState('')
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [dueDateTimestamp, setDueDateTimestamp] = useState(null);
  const [showing, setShowing] = useState(false);
  const [projectStartDateTimestamp, setProjectStartDateTimestamp] = useState(null);
  const [projectDueDateTimestamp, setProjectDueDateTimestamp] = useState(null);

  
  console.log(id);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("login_token");
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://redundant-discussion-zesty-star-production.pipeops.app/api/projects/${id}/project`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setProjectDetails(data.message);
        console.log("assigned milestone", data.message.milestones);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [id]);

  useEffect(() => {
    const fetchProjectStatus = async () => {
      const token = localStorage.getItem("login_token");
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://redundant-discussion-zesty-star-production.pipeops.app/api/projects/${id}/status`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log('project status',data);
        setProjectStatus(data.message);
        console.log("assigned milestone", data.message);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProjectStatus();
  }, [id]);

  const columns = [
    { header: "S/N", accessor: "_id" },
    { header: "Task Name", accessor: "name" },
    { header: "Due Date", accessor: "due_date" },
    { header: "Assigned To", accessor: "collaborator" },
    { header: "Status", accessor: "status" },
    { header: "Action", accessor: "action" },
  ];

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

  const [updateProject, setUpdateProject] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    collaborators: [""],
  });

  
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
        window.location.reload();
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
      console.log("task", data.milestones);
    }
  };

  const handleStarted = async (id) => {
    const token = localStorage.getItem("login_token");
    try {
      const { data } = await axios.put(
        `https://redundant-discussion-zesty-star-production.pipeops.app/api/milestones/${id}/started`,{},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (data.success === true) {
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
       
      } 
      console.log(data);
    } catch (error) {
      console.log(error);
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
    }
  };

  const handleCompleted = async(id)=> {
    const token = localStorage.getItem("login_token");
    try {
      const { data } = await axios.put(
        `https://redundant-discussion-zesty-star-production.pipeops.app/api/milestones/${id}/completed`,{},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (data.success === true) {
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
       
      } 
      console.log(data);
    } catch (error) {
      console.log(error);
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
    }
  }

 

  const showProject = () => {
    setShowProjectModal(true);
  };
  const closeProject = () => {
    setShowProjectModal(false);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newCollaborators = [...task.collaborators];
      newCollaborators[index] = value;
      setUpdateProject({
        ...updateProject,
        collaborators: newCollaborators,
      });
    } else {
      setUpdateProject({
        ...updateProject,
        [name]: value,
      });
    }
  };
  const handleAddCollaborator = () => {
    setUpdateProject({
      ...updateProject,
      collaborators: [...task.collaborators, ""],
    });
  };

  const handleRemoveCollaborator = (index) => {
    const newCollaborators = task.collaborators.filter((_, i) => i !== index);
    setUpdateProject({
      ...updateProject,
      collaborators: newCollaborators,
    });
  };

  const handleUpdateProject = async () => {
  
    const token = localStorage.getItem("login_token");
    const data = {
      name: updateProject.name,
      description: updateProject.description,
      start_date: projectStartDateTimestamp,
      end_date: projectDueDateTimestamp,
      collaborators: updateProject.collaborators,
    };
    setLoading(true);
    try {
      const res = await axios.put(`${URL}/projects/${id}/edit`, data, {
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
        window.location.reload();
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
      console.log("task", data.milestones);
    }
  };

  return (
    <div className="px-4 md:px-11  w-full">
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-secondaryGrey ">Menu</span>

          <IoIosArrowRoundForward className="text-[#696969]" size={30} />

          <span className="text-[#696969] cursor-pointer">
            <Link className="no-underline text-[#696969]" to="/projects">
              Projects
            </Link>
          </span>
          <IoIosArrowRoundForward className="text-[#696969]" size={30} />

          <span className="text-textBlack">Project details</span>
        </div>
        {show ? (
          <div className="flex">
            <button className="bg-primaryBlue w-full text-[#ffff] rounded-2xl py-3 px-9  font-bold" onClick={showProject}>
              Edit
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex gap-4">
        <button
          className={
            show
              ? "text-xl font-bold text-primaryBlue border-b border-b-primaryBlue mb-5 cursor-pointer"
              : " text-xl font-bold  mb-5 cursor-pointer"
          }
          onClick={() => setShow(true)}
        >
          Overview
        </button>
        <button
          className={
            !show
              ? "text-xl font-bold text-primaryBlue border-b border-b-primaryBlue mb-5 cursor-pointer"
              : "text-xl font-bold  mb-5 cursor-pointer"
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
                    {projectDetails ? projectDetails?.milestones?.length : ""}
                  </span>
                </div>
                <div className="flex flex-col gap-2 ">
                  <span className="text-[#979797] text-xs">Start Date</span>
                  <span className="text-[#1A1817] text-xs font-medium">
                    {projectDetails
                      ? formatISODate(projectDetails?.start_date)
                      : ""}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#979797] text-xs">Due Date</span>
                  <span className="text-[#1A1817] text-xs font-medium">
                    {projectDetails
                      ? formatISODate(projectDetails?.end_date)
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#979797] text-xs">Status</p>
              <span className={`p-2 rounded md ${projectStatus === 'No milestones' ? 'bg-secondaryGrey text-[white]': projectStatus === "Not started"? " bg-[#f12929] text-[white]": projectStatus==="Ongoing"? "bg-[#ECA234] text-[white]": projectStatus === "Completed"? "bg-[#069852] text-[white]": null}`}>{projectStatus? projectStatus: 'N/A'}</span>
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
                <div className="grid grid-cols-2 gap-4">
                {projectDetails
                  ? projectDetails?.collaborators?.map((member, index) => (
                      <div className="col-span-1" key={index}>
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://ui-avatars.com/api/?name=${member}&background=0979A1&color=fff`}
                            alt="profile"
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <p className="text-[#1A1817] font-medium">{member}</p>
                        </div>
                      </div>
                    ))
                  : null}
                </div>
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
          <Modal
        isOpen={showProjectModal}
        onClose={closeProject}
        onAdd={handleUpdateProject}
        className="w-screen md:w-3/5 mx-auto bg-[#fff] border bg-opacity-100 h-full overflow-y-scroll rounded-2xl py-10 mt-5 "
      >
        <div className="flex flex-col gap-4 px-14 ">
          <div className="flex justify-between">
            <div className="text-3xl text-left text-[#020202] font-bold">
              Update Project
            </div>
            <div
              onClick={closeProject}
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
              Title <FaAsterisk className="text-[red]" size={7} />
            </label>
            <div className="flex justify-between p-2 md:p-4 w-full rounded-lg border border-[#E7E7E7] ">
              <input
                className="bg-inherit w-full border-none outline-none placeholder:text-sm"
                placeholder="e.g. Website Design"
                id="name"
                name="name"
                value={updateProject.name}
                onChange={(e) => setUpdateProject({ ...updateProject, name: e.target.value })}
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
                value={updateProject.description}
                onChange={(e) =>
                  setUpdateProject({ ...updateProject, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex w-full gap-6 justify-between">
            <div className="mb-4 md:mb-6 basis-1/2">
              <label
                className="font-medium text-base md:text-[18px] text-[#0D0D0D] mb-2 flex"
                htmlFor="start_date"
              >
                Start Date <FaAsterisk className="text-[red]" size={7} />
              </label>
              <div className="flex justify-between p-2 md:p-4 w-full rounded-lg border border-[#E7E7E7] ">
                <input
                  className="bg-inherit w-full border-none outline-none placeholder:text-sm"
                  placeholder="e.g. Website Design"
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={updateProject.start_date}
                  onChange={(e) => {
                    setUpdateProject({ ...updateProject, start_date: e.target.value });
                    const unixTimestamp = new Date(e.target.value).getTime();
                    setProjectStartDateTimestamp(unixTimestamp);
                  }}
                />
              </div>
            </div>
            <div className="mb-4 md:mb-6 basis-1/2">
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
                  value={updateProject.end_date}
                  onChange={(e) => {
                    setUpdateProject({ ...updateProject, end_date: e.target.value });
                    const dueUnixTimestamp = new Date(e.target.value).getTime();
                    setProjectDueDateTimestamp(dueUnixTimestamp);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 md:mb-6">
            <label
              className="font-medium text-base md:text-[18px] text-[#0D0D0D] mb-2"
              htmlFor="collaborators"
            >
              Invite Team Members
            </label>
            <div className="flex justify-between p-2 md:p-4 w-full rounded-lg border border-[#E7E7E7] ">
              <input
                className="bg-transparent w-full border-none outline-none placeholder:text-sm"
                placeholder="e.g. Website Design"
                id="collaborators"
                name="collaborators"
                value={updateProject.collaborators}
                disabled
              />
            </div>

            <div className="flex gap-2 p-2 md:p-4 min-h-14 w-full ">
              {updateProject.collaborators.map((collaborator, index) => (
                <button
                  key={index}
                  className="bg-[#8495F8] flex border  p-2 md:px-2.5 md:py-1.5 rounded-md text-[#F6F6F6] "
                >
                  <input
                    type="email"
                    className="bg-[#8495F8] w-full border-none outline-none placeholder:text-sm text-[#F6F6F6]"
                    placeholder="e.g. Website Design"
                    id="collaborators"
                    name="collaborators"
                    value={collaborator}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCollaborator(index)}
                  >
                    X
                  </button>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddCollaborator}
              className="border-b-2 border-b-primaryBlue"
            >
              Tap to Add Email
            </button>
          </div>

          <button
            onClick={handleUpdateProject}
            className="py-4 px-3 bg-primaryBlue rounded-md text-[white]"
          >
            {loading ? "Updating Project..." : "Update Project"}
          </button>
        </div>
      </Modal>
        </div>
      ) : (
        <div>
          <div></div>
          <div className="flex justify-between items-center ">
            <div className=" bg-[#EDEDEE] border border-[#EDEDEE] rounded-md  pl-3 bg-transparent w-[300px] h-[40px] flex gap-3">
              <input
                className="outline-none border-none w-full bg-transparent"
                id="input-placeholder"
                placeholder="Search by task name"
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
          <Table
            columns={columns}
            data={projectDetails && projectDetails.milestones}
            handleStarted={handleStarted}
            handleCompleted={handleCompleted}
          />

          <Modal
            isOpen={showing}
            onClose={closeBudget}
            onAdd={handleAddTodo}
            className="w-screen md:w-3/5 mx-auto bg-[#fff] border h-screen overflow-x-scroll bg-opacity-100 rounded-2xl py-10 mt-5 "
          >
            <div className="flex flex-col gap-4 px-14 ">
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
