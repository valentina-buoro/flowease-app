import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { FaAsterisk } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
  const URL = "https://flowease.onrender.com/api";
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState("");
  const [budgets, setBudgets] = useState([]);
  //const [task, setTask] = useState('');
  const [task, setTask] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    collaborators: [""],
    /*receiverBank: "",
    accNumber: "",*/
  });

  const [startDateTimestamp, setStartDateTimestamp] = useState(null);
  const [dueDateTimestamp, setDueDateTimestamp] = useState(null);

  const [show, setShow] = useState(false);

  const showBudget = () => {
    setShow(true);
  };
  const closeBudget = () => {
    setShow(false);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newCollaborators = [...task.collaborators];
      newCollaborators[index] = value;
      setTask({
        ...task,
        collaborators: newCollaborators,
      });
    } else {
      setTask({
        ...task,
        [name]: value,
      });
    }
  };

  const handleAddCollaborator = () => {
    setTask({
      ...task,
      collaborators: [...task.collaborators, ""],
    });
  };

  const handleRemoveCollaborator = (index) => {
    const newCollaborators = task.collaborators.filter((_, i) => i !== index);
    setTask({
      ...task,
      collaborators: newCollaborators,
    });
  };

  const handleAddTodo = async() => {
    //if (task.trim() === "") return;
    setBudgets([...budgets, task]);
    const token  = localStorage.getItem("login_token");
    const data = {
      name: task.name,
      description: task.description,
      start_date: startDateTimestamp,
      end_date: dueDateTimestamp,
      collaborators: task.collaborators
    };
setLoading(true);
    try {
      const res = await axios.post(`${URL}/projects/create`, data, {
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
        navigate("/projects");
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
      console.log(data);
    }
  };

  const formattedDate = (date) => {
    const dateOptions = {  year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    return `${formattedDate}`
  };

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
    <div className=" w-full my-10">
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-secondaryGrey ">Menu</span>

          <IoIosArrowRoundForward className="text-[#696969]" size={30} />

          <span className="text-textBlack">Dashboard</span>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-primaryBlue text-[#ffff] rounded-2xl py-2.5 px-7  font-bold"
            onClick={showBudget}
          >
            Create Project
          </button>
          <button className="bg-[#F5F4F8] rounded-2xl py-2.5 px-7 flex items-center justify-center font-bold border">
           <CiCalendar/> {formattedDate(currentDate)}
          </button>
        </div>
      </div>

      <Modal
        isOpen={show}
        onClose={closeBudget}
        onAdd={handleAddTodo}
        className="w-screen md:w-3/5 mx-auto bg-[#fff] h-screen overflow-y-scroll border bg-opacity-100 rounded-2xl py-10 mt-5 "
      >
        <div className="flex flex-col gap-4 px-14">
          <div className="flex justify-between">
            <div className="text-3xl text-left text-[#020202] font-bold">
              Create a New Project
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
              Title <FaAsterisk className="text-[red]" size={7} />
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
                  value={task.start_date}
                  onChange={(e) =>
                   { setTask({ ...task, start_date: e.target.value })
                   const unixTimestamp = new Date(e.target.value).getTime();
                   setStartDateTimestamp(unixTimestamp);
                  }
                    
                  }
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
                  value={task.end_date}
                  onChange={(e) =>
                    {setTask({ ...task, end_date: e.target.value })
                    const dueUnixTimestamp = new Date(e.target.value).getTime();
                    setDueDateTimestamp(dueUnixTimestamp);
                  }
                  }
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
                value={task.collaborators}
                disabled
              />
            </div>

            <div className="flex gap-2 p-2 md:p-4 min-h-14 w-full ">
             
           
              {task.collaborators.map((collaborator, index) => (
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
            <button type="button" onClick={handleAddCollaborator} className="border-b-2 border-b-primaryBlue">
              Tap to Add Email
            </button>
          </div>

          <button onClick={handleAddTodo} className="py-4 px-3 bg-primaryBlue rounded-md text-[white]">
           {loading? (
           "Creating Project..."
          ) : (
            "Add Task"
          )}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProject;
