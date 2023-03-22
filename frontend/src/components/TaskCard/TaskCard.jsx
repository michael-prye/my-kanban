import "./TaskCard.css"
import { Modal } from "react-bootstrap";
import { Check2, Check2All, ThreeDotsVertical, XCircle} from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import useAxios from "../../hooks/useAxios"


const TaskCard = (props) => {
    const [taskModal, showTaskModal] = useState(false)
    const [taskForm, setTaskForm] = useState(props.task)
    const [deleteModal, showDeleteModal] = useState(false)


    const [statusData, putTaskStatus] = useAxios('http://127.0.0.1:8000/api/task/', 'PUT', null)
    const [taskData, putTask] = useAxios('http://127.0.0.1:8000/api/task/', 'PUT', taskForm)
    const [deleteTaskData, deleteTask] = useAxios('http://127.0.0.1:8000/api/task/','DELETE',null)


    const updateStatus = async(status, id)=>{
        await putTaskStatus(id, null, status);
        await props.getTasks(null,props.date);
    }

    const handleInputChange =(e)=>{
        e.persist();
        setTaskForm({...taskForm, [e.target.name]: e.target.value})
    }
    const updateTask = async(id)=>{
        await putTask(id,null,null);
        await props.getTasks(null, null,props.date);
        showTaskModal(false)
    }
    const handleDeleteModal =()=>{
        showTaskModal(false)
        showDeleteModal(true)
    }
    const handleDelete = async(id)=>{
        await deleteTask(id,null,null);
        await props.getTasks(null, null,props.date); 
        showDeleteModal(false)


    }



    return (
        <div>
        <Container className="task-card" >
            <Row> <h6 className="task-name">{props.task.name}</h6></Row>
            <Row>
                <Col><p className="task-description">{props.task.description}</p></Col>
                <Col>
                    {props.task.status == 'backlog' &&

                        <Check2 size={20} className="task-check" onClick={()=>updateStatus('doing', props.task.id)}/> 
                    }
                    {props.task.status == 'doing' &&
                        <Check2All size={20} onClick={()=>updateStatus('done', props.task.id)} className="task-check"/> 
                    }
                </Col>
                <Col><ThreeDotsVertical onClick={()=>showTaskModal(true)}/></Col>
            </Row>
        </Container>
        <Modal show={taskModal} onHide={()=>showTaskModal(false)} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>{props.task.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="task-form">
                    <input className="task-input"
                    type='text'
                    name='name'
                    value={taskForm.name}
                    onChange={handleInputChange}/>
                    <textarea className="task-input"
                    name="description"
                    value={taskForm.description}
                    rows='4'
                    cols='30'
                    onChange={handleInputChange}/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleDeleteModal}>Delete</button>
                <button onClick={()=>updateTask(props.task.id)}>Update</button>
            </Modal.Footer>
            
        </Modal>
        <Modal show={deleteModal} onHide={()=>showDeleteModal(false)} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want to delete Task?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <button onClick={()=>handleDelete(props.task.id)}>Yes</button>
                <button onClick={()=>showDeleteModal(false)}>No</button>
            </Modal.Footer>

        </Modal>
        </div>
     );
}
 
export default TaskCard;