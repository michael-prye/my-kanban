// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";


// Component Imports
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";


function App() {
  return (
    <div>
      <NavBar />
      <SideBar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/project" element={<ProjectPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
