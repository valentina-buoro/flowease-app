import React from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const RecentProjectCard = ({ data }) => {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(`/projects/project-details/${data._id}`)}
      className=" "
    >
      <div className="border relative rounded-md py-4 px-6 bg-[#ffffff] hover:bg-[#E9EDFF]">
        <p className="font-medium text-[15px] ">{data.name}</p>
        <p className="text-xs text-[#4E4F52]">
          Task: <span className="text-primaryGreen">{'0'}</span>
          <span>/{data.milestones?.length}</span>
        </p>
        <div>
          <p className="text-[#4E4F52] text-[10px]"> Progress:</p>
          <ProgressBar
            variant={
            'success'
               
            }
            now={50}
            style={{
              height: "5px",
            }}
          />

          
        </div>

        
      </div>
    </div>
  );
};

export default RecentProjectCard;
