import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectCard from '../../projectComponents/childrenComponents/project/projectCard';
import { Link } from "react-router-dom";
//import RecentProjectCard from "./recentProjectCard";

const RecentProjects = () => {
  const [loading, setLoading] = useState(false);
  const [assignedProjects, setAssignedProjects] = useState(null);
  const [createdProjects, setCreatedProjects] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("login_token");
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://flowease.onrender.com/api/projects/list",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setAssignedProjects(data?.message?.assigned_projects?.slice(-1)[0]);
        console.log("assigned", data.message.assigned_project);
        setCreatedProjects(data?.message?.created_projects?.slice(-1)[0]);
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
    fetchProjects();
  }, []);
  return (
    <div className=" mb-5">
    <div className="flex justify-between items-center"><p className="font-medium text-xl text-[#1B1D21]"> Recent Projects</p>
    <Link to="/projects" className="text-primaryBlue font-normal text-base">View All</Link>
    </div>
      <div>
        {loading ? (
          <div className="  ">
            <div className="h-1/2 flex items-center justify-center">
              <CircleLoader color="#15226C" size={100} />
            </div>{" "}
          </div>
        )   : null}
        <div className="grid grid-cols-2 gap-3 ">
        {assignedProjects && (
            <ProjectCard data={assignedProjects} />
        )}
        {createdProjects && (
            <ProjectCard data={createdProjects} />
        )}
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
