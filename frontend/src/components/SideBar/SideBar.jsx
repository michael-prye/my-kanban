import { useNavigate } from "react-router-dom";
import "./SideBar.css"


const SideBar = () => {

const navigate = useNavigate();

    return ( 
        <div class='sidenav'>
            <h6 onClick={()=> navigate("/")}>Dash Board</h6>
            <h6 onClick={()=> navigate("/project")}>Projects</h6>
        </div>
     );
}
 
export default SideBar;