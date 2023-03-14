import "./TaskCard.css"
import { Modal } from "react-bootstrap";
import { Check2, Check2All } from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useFetch from "../../hooks/useFetch";
import { useState } from "react";


const TaskCard = (props) => {

    const [data, putTaskStatus] = useFetch('http://127.0.0.1:8000/api/task/', 'PUT', null)
    const [taskModal, showTaskModal] = useState(false)
    const [taskForm, setTaskForm] = useState(props.task)

    const updateStatus = async(status, id)=>{
        await putTaskStatus(id, status);
        await props.getTasks();

    }



    return (
        <div>
        <Container className="task-card" onClick={()=>showTaskModal(true)}>
            <Row> <h6>{props.task.name}</h6></Row>
            <Row>
                <Col><p className="task-description">{props.task.description}</p></Col>
                <Col>
                    {props.task.status == 'backlog' &&
                        <Check2 className="doing-check" onClick={()=>updateStatus('doing', props.task.id)}/> 
                    }
                    {props.task.status == 'doing' &&
                        <Check2All onClick={()=>updateStatus('done', props.task.id)}/> 
                    }
                </Col>
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
                    value={taskForm.name}/>
                    <textarea className="task-input"
                    name="description"
                    value={taskForm.description}
                    rows='4'
                    cols='30'/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={()=>showTaskModal(false)}>Exit</button>
            </Modal.Footer>
            
        </Modal>
        </div>
     );
}
 
export default TaskCard;