import React from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const ProjectCard = ({ data }) => {
  const navigate = useNavigate();
  const completed = data.milestones.filter(
    (milestone) => milestone.status === "Completed"
  ).length;
  const progress = (completed / data.milestones.length) * 100;
  return (
    <div
      onClick={() => navigate(`/projects/project-details/${data._id}`)}
      className="col-span-1 "
    >
      <div className="border relative rounded-md py-4 px-6 bg-[#ffffff] hover:bg-[#E9EDFF]">
        <p className="font-medium text-[15px] ">{data.name}</p>
        <p className="text-xs text-[#4E4F52]">
          Task: <span className="text-primaryGreen">{completed}</span>
          <span>/{data.milestones.length}</span>
        </p>
        <div>
          <p className="text-[#4E4F52] text-[10px]"> Progress:</p>
          <ProgressBar
            variant={
              progress === 100
                ? "success"
                : progress > 0 && progress < 100
                ? "warning"
                : "transparent"
            }
            now={progress}
            style={{
              height: "5px",
            }}
          />

          
        </div>

        <div className=" my-3">
            {data.collaborators.map((src, index) => (
              <img
                key={index}
                src={`https://ui-avatars.com/api/?name=${src}&background=random&color=fff`}
                alt={`mage ${index + 1}`}
                className="absolute bottom-1 left-10 w-[25px]  h-auto transition-transform duration-300 ease-in-out rounded-full ml-4"
                style={{ left: `${index * 20}px` }} // Adjust the overlap offset
              />
            ))}
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;
