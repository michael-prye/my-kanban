import "./ProjectPage.css"
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";

const ProjectPage = () => {

    const [projectList, getProjectsList] = useAxios('http://127.0.0.1:8000/api/project/','GET', null)
    const [project, getProjects] = useAxios('http://127.0.0.1:8000/api/project/','GET', null)
    const [projectSelect, setProjectSelect] = useState('DEFAULT')
    

    useEffect(()=>{
        getProjectsList();
    },[])

    const handleProjectSelect = async(e)=>{
        e.persist();
        if(e.target.value === 'new'){
            console.log('Create New Project')
        }
        else{
            setProjectSelect(e.target.value)
            await getProjects(e.target.value,null,null)
        }
        

    }



    return ( 
        <div class="project-container">
            <select  value={projectSelect} onChange={handleProjectSelect}>
                <option value='DEFAULT' disabled hidden  >Select Project</option>
                <option value='new'>Add new project</option>
                {projectList.map((proj)=>(
                    <option value={proj.id}>{proj.name}</option>
                ))}

            </select>
            {project[0] && 
                <h2>{project[0].name}</h2>
            }
        </div>
        
     );
}
 
export default ProjectPage;