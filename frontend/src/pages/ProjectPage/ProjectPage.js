import "./ProjectPage.css"
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ProjectMain from "../../components/ProjectMain/ProjectMain";

const ProjectPage = () => {

    const defaultProjectForm = {name:'', description:''}
    const [projectForm, setProjectForm] = useState(defaultProjectForm)
    const [projectSelect, setProjectSelect] = useState('DEFAULT')


    const [projectModal, showProjectModal] = useState(false)
    const [editProjectModal, showEditModal] = useState(false)
    const [deleteModal, showDeleteModal] = useState(false)

    const [projectList, getProjectsList] = useAxios('http://127.0.0.1:8000/api/project/','GET', null)
    const [project, getProject] = useAxios('http://127.0.0.1:8000/api/project/','GET', null)
    const [postProjectData, postProject] = useAxios('http://127.0.0.1:8000/api/project/','POST', projectForm)
    const [putProjectData, putProject] = useAxios('http://127.0.0.1:8000/api/project/','PUT', projectForm)
    const [deleteProjectData, deleteProject] = useAxios('http://127.0.0.1:8000/api/project/','DELETE', null)


  
    

    useEffect(()=>{
        getProjectsList();
    },[])

    const handleInputChange=(e)=>{
        e.persist();
        setProjectForm({...projectForm, [e.target.name]: e.target.value})
        console.log(projectForm)
    }

    const handleEditModal=()=>{
      setProjectForm(project[0])
      showEditModal(true)
    }
    const handleDeleteModal=()=>{
      showDeleteModal(true)
      showEditModal(false)
    }

    const handleProjectSelect = async(e)=>{
        e.persist();

        if(e.target.value === 'new'){
            showProjectModal(true)
        }
        else{
            setProjectSelect(e.target.value)
            await getProject(e.target.value,null,null)
        }
    }

    const handleProjectPost = async()=>{
        await postProject();
        await getProjectsList();
        showProjectModal(false)
        setProjectForm(defaultProjectForm)
    }

    const handleProjectDelete = async(id)=>{
      await deleteProject(id)
      await getProjectsList();
      await getProject();

      setProjectSelect('DEFAULT')
      showDeleteModal(false)
      setProjectForm(defaultProjectForm)
    }

    const handleProjectUpdate = async(id)=>{
      await putProject(id)
      await getProject(id)
      showEditModal(false)
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
          {project[0] && (
            <>
            <ProjectMain project={project[0]} editModal={handleEditModal} />
            <Modal
            className="edit-Project"
            show={editProjectModal}
            onHide={() => showEditModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Project</Modal.Title>
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
              <button onClick={handleDeleteModal}>Delete</button>
              <button onClick={()=>handleProjectUpdate(project[0].id)}>Update</button>
            </Modal.Footer>
          </Modal>
          <Modal
            className="delete-modal"
            show={deleteModal}
            onHide={()=> showDeleteModal(false)}
            centered>
              <Modal.Header closeButton>
                <Modal.Title>Do you want to delete project?</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <button onClick={()=>handleProjectDelete(project[0].id)}>Yes</button>
                <button onClick={()=> showDeleteModal(false)}>No</button>
              </Modal.Footer>
            </Modal>
            </>
          )}
        </div>
        <Modal
          className="new-project"
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