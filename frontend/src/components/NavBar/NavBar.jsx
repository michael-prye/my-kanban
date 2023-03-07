import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>React/Django JWT</b>
          </Link>
        </li>
        <li>
  
        </li>
      </ul>
    </div>
    
    
  );
};

export default Navbar;
