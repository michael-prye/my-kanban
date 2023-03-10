import "./TaskCard.css"
import { Modal } from "react-bootstrap";
import { Check2, Check2All } from "react-bootstrap-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const TaskCard = ({task}) => {



    return ( 
        <Container className="task-card">
            <Row> <h6>{task.name}</h6></Row>
            <Row>
                <Col><p className="task-description">{task.description}</p></Col>
                <Col>
                    {task.status == 'backlog' &&
                        <Check2/> 
                    }
                    {task.status == 'doing' &&
                        <Check2All/> 
                    }
                </Col>
            </Row>
           
            
            

        </Container>
     );
}
 
export default TaskCard;