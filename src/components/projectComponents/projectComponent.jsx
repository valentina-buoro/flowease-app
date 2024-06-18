import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateProject from "./childrenComponents/createProject";
import ProjectCard from "./childrenComponents/project/projectCard";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectComponent = () => {
  const [loading, setLoading] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [createdProjects, setCreatedProjects] = useState([]);

  const [all, setAll] = useState(true);
  const [created, setCreated] = useState(false);
  const [assigned, setAssigned] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
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

        const combinedArray = [
          ...data.message.assigned_projects,
          ...data.message.created_projects,
        ];

        const uniqueArray = Array.from(
          new Map(combinedArray.map((item) => [item._id, item])).values()
        );
        setAllProjects(uniqueArray);
        setAssignedProjects(data.message.assigned_projects);
        setCreatedProjects(data.message.created_projects);
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
    <div className="px-4 md:px-11  w-full">
      <CreateProject />
      <div>
        <div className="flex">
          <p
            className={
              all
                ? "text-lg mr-5 text-primaryBlue border-b-2 border-b-primaryBlue cursor-pointer"
                : "cursor-pointer text-lg mr-5"
            }
            onClick={() => {
              setAll(true);
              setCreated(false);
              setAssigned(false);
            }}
          >
            All
          </p>
          <p
            className={
              created
                ? "text-lg mr-5 text-primaryBlue border-b-2 border-b-primaryBlue cursor-pointer"
                : "cursor-pointer text-lg mr-5"
            }
            onClick={() => {
              setCreated(true);
              setAll(false);
              setAssigned(false);
            }}
          >
            Created
          </p>
          <p
            className={
              assigned
                ? "text-lg mr-5 text-primaryBlue border-b-2 border-b-primaryBlue cursor-pointer"
                : "cursor-pointer text-lg mr-5"
            }
            onClick={() => {
              setAssigned(true);
              setAll(false);
              setCreated(false);
            }}
          >
            Assigned To
          </p>
        </div>
      </div>
      {loading ? (
        <div className="  h-screen">
          <div className="h-1/2 flex items-center justify-center">
            <CircleLoader color="#15226C" size={100} />
          </div>{" "}
        </div>
      ) : null}
      {all && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-6">
            {allProjects?.length > 0 &&
              allProjects.map((assigned) => {
                return <ProjectCard data={assigned} key={assigned._id} />;
              })}
          </div>
        </div>
      )}

      {created && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-6">
          {createdProjects?.length > 0 &&
            createdProjects.map((created) => {
              return <ProjectCard data={created} key={created._id} />;
            })}
        </div>
      )}
      {assigned && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-6">
          {assignedProjects?.length > 0 &&
            assignedProjects.map((assigned) => {
              return <ProjectCard data={assigned} key={assigned._id} />;
            })}
        </div>
      )}
    </div>
  );
};

export default ProjectComponent;
