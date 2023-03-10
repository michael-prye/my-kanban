import "./BacklogTask.css"
const BacklogTask = ({task}) => {



    return ( 
        <div className="task">
            <h6>{task.name}</h6>
            <p className="task-description">{task.description}</p>
        </div>
     );
}
 
export default BacklogTask;