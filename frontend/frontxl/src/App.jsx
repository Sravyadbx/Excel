import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import RolePage from "./Pages/RolePage/RolePage";
import AccessPage from "./Pages/AccessPage/AccessPage";
import SpreadSheet from "./Pages/SpreadSheet/SpreadSheet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Navbar navbarTitle={"Import Data From Darwinbox"} />
      <Routes>
        <Route path="/" element={<AccessPage />} />
        <Route path="/rolePage" element={<RolePage />} />
        <Route path="/spreadsheets" element={<SpreadSheet />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000}/>

  
    </>
  );
}

export default App;



