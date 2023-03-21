import "./TaskCard.css"
import { Modal } from "react-bootstrap";
import { Check2, Check2All, ThreeDotsVertical} from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import useAxios from "../../hooks/useAxios"


const TaskCard = (props) => {
    const [taskModal, showTaskModal] = useState(false)
    const [taskForm, setTaskForm] = useState(props.task)


    const [statusData, putTaskStatus] = useAxios('http://127.0.0.1:8000/api/task/', 'PUT', null)
    const [taskData, putTask] = useFetch('http://127.0.0.1:8000/api/task/', 'PUT', taskForm)


    const updateStatus = async(status, id)=>{
        await putTaskStatus(id, null, status);
        await props.getTasks(null,props.date);
    }

    const handleInputChange =(e)=>{
        e.persist();
        setTaskForm({...taskForm, [e.target.name]: e.target.value})
    }
    const updateTask = async(id)=>{
        await putTask(id);
        await props.getTasks(null, null,props.date);
        showTaskModal(false)
    }



    return (
        <div>
        <Container className="task-card" >
            <Row> <h6>{props.task.name}</h6></Row>
            <Row>
                <Col><p className="task-description">{props.task.description}</p></Col>
                <Col>
                    {props.task.status == 'backlog' &&
                        <Check2 size='25' className="doing-check" onClick={()=>updateStatus('doing', props.task.id)}/> 
                    }
                    {props.task.status == 'doing' &&
                        <Check2All onClick={()=>updateStatus('done', props.task.id)}/> 
                    }
                </Col>
                <Col><ThreeDotsVertical onClick={()=>showTaskModal(true)}/></Col>
            </Row>
        </Container>
        <Modal show={taskModal} onHide={()=>showTaskModal(false)} centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Task</Modal.Title>
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
                <button onClick={()=>showTaskModal(false)}>Exit</button>
                <button onClick={()=>updateTask(props.task.id)}>Update</button>
            </Modal.Footer>
            
        </Modal>
        </div>
     );
}
 
export default TaskCard;