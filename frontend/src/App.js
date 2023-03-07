// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";


// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
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
      <Footer />
    </div>
  );
}

export default App;
