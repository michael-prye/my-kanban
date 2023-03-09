import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li>
        
            <b className="brand" onClick={()=> navigate("/")}>React/Django JWT</b>
        </li>
        <li>
  
        </li>
      </ul>
    </div>
    
    
  );
};

export default Navbar;
