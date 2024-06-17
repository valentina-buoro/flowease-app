import "./index.css";
import Routes from '../src/routes/index'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <>
    
    <div className="">
      <Routes/>
      <ToastContainer />
    </div>
    </>
  );
}

export default App;
