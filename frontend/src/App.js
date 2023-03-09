// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";


// Component Imports
import Navbar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";


function App() {
  return (
    <div>
      <Navbar />
      <SideBar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/project" element={<ProjectPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
