import { useNavigate } from "react-router-dom";
import "./SideBar.css"

const SideBar = () => {

const navigate = useNavigate();





    return ( 
        <div className='sidenav'>
            <ul>
                <li><h5 onClick={()=> navigate("/")}>Dash Board</h5></li>
                <li><h5 onClick={()=> navigate("/project")}>Projects</h5></li>
            </ul>
        </div>
     );
}
 
export default SideBar;