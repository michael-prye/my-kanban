import { useNavigate } from "react-router-dom";
import "./SideBar.css"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
const SideBar = () => {

const navigate = useNavigate();
const [projects, getProjects] = useFetch('http://127.0.0.1:8000/api/project/','GET', null)
const [projectDropdown, setProjectDropdown] = useState(false)

useEffect(()=>{
    getProjects();
},[])


    return ( 
        <div className='sidenav'>
            <ul>
                <li><h5 onClick={()=> navigate("/")}>Dash Board</h5></li>
                <li><h5 onClick={()=> navigate("/project")}>Projects</h5>
                    {projectDropdown ? <ChevronUp onClick={()=>setProjectDropdown(false)}/> : <ChevronDown onClick={()=>{setProjectDropdown(true)}}/>}</li>
                    {projectDropdown == true &&
                        <ul>
                            {projects.map((project)=>{
                                return(
                                    <li><h4>{project.name}</h4></li>
                                )
                            })}
                        </ul>
                
                        
                    
                    }
            </ul>

        </div>
     );
}
 
export default SideBar;