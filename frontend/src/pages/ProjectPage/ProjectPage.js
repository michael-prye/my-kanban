import "./ProjectPage.css"
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ProjectMain from "../../components/ProjectMain/ProjectMain";

const ProjectPage = () => {

    const defaultProjectForm = {name:'', description:''}
    const [projectForm, setProjectForm] = useState(defaultProjectForm)
    const [projectModal, showProjectModal] = useState(false)

    const [projectList, getProjectsList] = useAxios('http://127.0.0.1:8000/api/project/','GET', null)
    const [project, getProjects] = useAxios('http://127.0.0.1:8000/api/project/','GET', null)
    const [postProjectData, postProject] = useAxios('http://127.0.0.1:8000/api/project/','POST', projectForm)
    const [projectSelect, setProjectSelect] = useState('DEFAULT')
    

    useEffect(()=>{
        getProjectsList();
    },[])

    const handleInputChange=(e)=>{
        e.persist();
        setProjectForm({...projectForm, [e.target.name]: e.target.value})
    }

    const handleProjectSelect = async(e)=>{
        e.persist();
        if(e.target.value === 'new'){
            showProjectModal(true)
        }
        else{
            setProjectSelect(e.target.value)
            await getProjects(e.target.value,null,null)
        }
    }

    const handleProjectPost = async()=>{
        await postProject();
        await getProjectsList();
        showProjectModal(false)
        setProjectForm(defaultProjectForm)

    }



    return (
      <div>
        <div className="project-container">
          <select value={projectSelect} onChange={handleProjectSelect}>
            <option value="DEFAULT" disabled hidden>
              Select Project
            </option>
            <option value="new">Add new project</option>
            {projectList.map((proj) => (
              <option value={proj.id}>{proj.name}</option>
            ))}
          </select>
          {project[0] &&

            <ProjectMain project={project[0]}/>
          }
        </div>
        <Modal
          show={projectModal}
          onHide={() => showProjectModal(false)}
          centered={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="project-form">
              <input
                className="project-input"
                placeholder="name"
                name="name"
                value={projectForm.name}
                onChange={handleInputChange}
              />
              <textarea
                className="project-input"
                placeholder="description"
                name="description"
                maxLength="255"
                value={projectForm.description}
                onChange={handleInputChange}
                rows="4"
                cols="30"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => showProjectModal(false)}>Cancel</button>
            <button onClick={handleProjectPost}>Save</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}
 
export default ProjectPage;