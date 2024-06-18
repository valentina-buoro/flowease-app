import React from "react";
import CreateProject from "./childrenComponents/createProject";
import ProjectStats from "./childrenComponents/projectstats";
import Productivity from "./childrenComponents/productivity";
import DashboardClock from "./childrenComponents/clock";
import RecentProject from "./childrenComponents/recentProjects";

const DashboardComponent = ({ data }) => {
  return (
    <div className="px-4 md:px-11  w-full">
      <CreateProject />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
        <div className="col-span-1 md:col-span-2 ">
          <ProjectStats data={data} />
          <DashboardClock />
          <RecentProject />
        </div>

        <Productivity />
      </div>
    </div>
  );
};

export default DashboardComponent;
