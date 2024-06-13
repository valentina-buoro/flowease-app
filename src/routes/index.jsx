

import { useRoutes } from "react-router-dom";

import MainRoutes from "./mainRoutes";
import Login from "../pages/authPages/login";
import Signup from "../pages/authPages/signup";
import LandingPage from "../pages/landingpage";

// ================|| ROUTING RENDER ||================ //

export default function ThemeRoutes() {
  return useRoutes([
    {path: "/", element: <LandingPage/>},
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    MainRoutes,
   
    
  ]);
}
