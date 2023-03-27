const ProjectMain = ({project}) => {



    return ( 
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
        </div>
     );
}
 
export default ProjectMain;