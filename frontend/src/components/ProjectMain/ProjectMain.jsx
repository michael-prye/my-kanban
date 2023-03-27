import "./ProjectMain.css"

const ProjectMain = ({project, editModal}) => {





    return ( 
        <div className="project-info">
            <button onClick={()=>editModal()}>delete</button>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </div>
     );
}
 
export default ProjectMain;