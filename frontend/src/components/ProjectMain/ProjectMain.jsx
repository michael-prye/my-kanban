import "./ProjectMain.css"

const ProjectMain = ({project}) => {



    return ( 
        <div className="project-info">
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </div>
     );
}
 
export default ProjectMain;