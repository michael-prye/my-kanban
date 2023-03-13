import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {

  const navigate = useNavigate();




  return (
    <div className="navBar">
      
       
        
      <b className="brand" onClick={()=> navigate("/")}>MyKanBan</b>
       
    </div>
    
    
  );
};

export default NavBar;
