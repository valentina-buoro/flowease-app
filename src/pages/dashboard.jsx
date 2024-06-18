import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardComponent from "../components/dashboardComponents/dashboardComponent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("login_token");
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://flowease.onrender.com/api/users/user`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setData(data.message);
        localStorage.setItem("full_name", data.message.full_name);
        localStorage.setItem("email", data.message.email)
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
    <div >
      {loading ? <div>Loading </div> : null}
      {data && (
        <>
          
         
            <DashboardComponent data={data} />
        
        </>
      )}
    </div>
  );
};

export default Dashboard;
