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


    const updateStatus = async(status, id)=>{
        await putTaskStatus(id, status);
        await props.getTasks();

    }



    return ( 
        <Container className="task-card">
            <Row> <h6>{props.task.name}</h6></Row>
            <Row>
                <Col><p className="task-description">{props.task.description}</p></Col>
                <Col>
                    {props.task.status == 'backlog' &&
                        <Check2 className="doing-check" onClick={()=>updateStatus('doing', props.task.id)}/> 
                    }
                    {props.task.status == 'doing' &&
                        <Check2All/> 
                    }
                </Col>
            </Row>
           
            
            

        </Container>
     );
}
 
export default TaskCard;