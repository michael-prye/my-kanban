import { useEffect, useState } from "react";
import  Modal from "react-bootstrap/Modal";
import GetDate from "../../utils/GetDate";
import useFetch from "../../hooks/useFetch";
import useAxios from "../../hooks/useAxios"
import "./AddTask.css"




const AddTask = (props) => {
    let today = GetDate();


    // form states
    const defaultTaskForm = {name:'',description:'',date:today,status:'backlog'};
    const [taskForm, setTaskForm] = useState(defaultTaskForm);
    const [taskModal, showTaskModal] = useState(false)

    const [task, sendTask] = useAxios('http://127.0.0.1:8000/api/task/','POST',taskForm);


    const handleClose =()=>{
        showTaskModal(false)
    }
    const handleInputChange=(e)=>{
        e.persist();
        setTaskForm({...taskForm, [e.target.name]: e.target.value})
    }
    const handleTaskPost = async()=>{
        await sendTask();
        await props.getTasks(null, null, props.date);
        setTaskForm(defaultTaskForm);
        showTaskModal(false);
    }



    return (  
        <div>
            <button onClick={()=>showTaskModal(true)}>Add Task</button>

            <Modal show={taskModal} onHide={handleClose} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="task-form">
                        <input className="task-input"
                            placeholder='name'
                            type='text'
                            name='name'
                            value={taskForm.name}
                            onChange={handleInputChange}/>
                        <textarea className="task-input"
                            placeholder='description' 
                            name='description' 
                            value={taskForm.description} 
                            onChange={handleInputChange}
                            rows='4'
                            cols='30'/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleTaskPost}>Save</button>
                </Modal.Footer>

            </Modal>
        </div>
    );
}
 
export default AddTask;