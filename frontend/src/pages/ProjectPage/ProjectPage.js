import "./ProjectPage.css"
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";

const ProjectPage = () => {

    const [projectList, getProjectsList] = useAxios('http://127.0.0.1:8000/api/project/','GET', null)
    const [project, getProjects] = useAxios('http://127.0.0.1:8000/api/project/','GET', null)
    

    useEffect(()=>{
        getProjectsList();
    },[])

    const handleProjectSelect = async(e)=>{
        e.persist();
        await getProjects(e.target.value,null,null)

    }



    return ( 
        <div class="project-container">
            <h1>ProjectPage</h1>
            <button onClick={()=>console.log(project)}>show project</button>
            <select value={project} onChange={handleProjectSelect}>
                <option value='' disabled selected hidden>Select Project</option>
                {projectList.map((proj)=>(
                    <option value={proj.id}>{proj.name}</option>
                ))}

            </select>
            {project && 
                <h2>{project[0].name}</h2>
            }
            
        </div>
     );
}
 
export default ProjectPage;