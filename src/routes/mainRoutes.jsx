
import DashboardLayout from "../layout/index";
import AuthGuard from "../routes/authguard";

import Dashboard from "../pages/dashboard";
import Projects from "../pages/projects";
import ProjectDetailsPage from "../pages/projectDetails";
import Tasks from "../pages/tasks";



const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/projects",
      element: <Projects/>
    },
    {
        path: "/projects/project-details/:id",
        element: <ProjectDetailsPage/>
      },
      {
        path: "/tasks",
        element: <Tasks/>
      }
  ],
};

export default MainRoutes;

        
        
     
