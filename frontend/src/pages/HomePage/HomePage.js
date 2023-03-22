import React from "react";
import { useEffect, useState } from "react";
import "./HomePage.css"
import ReactDatePicker from "react-datepicker";
import GetDate from "../../utils/GetDate";
import { forwardRef } from "react";
import AddTask from "../../components/AddTask/AddTask";
import TaskCard from "../../components/TaskCard/TaskCard";
import useAxios from "../../hooks/useAxios";


const HomePage = () => {

  let date = GetDate();

  const [tasks, getTasks] = useAxios('http://127.0.0.1:8000/api/task/','GET',null)
  const [updateOldTaskData, updateOldTask] = useAxios('http://127.0.0.1:8000/api/task/date','GET',null)

  const [startDate, setStartDate] = useState(new Date())
  const [filterDate, setFilterDate] = useState(date)

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>{value}</button>));


 const handleDatePick = (date)=>{
  setStartDate(date);
  let tempDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  setFilterDate(tempDate)
 }



  useEffect(() => {
    getTasks(null,filterDate);
  }, [filterDate]);

  const handleUpdate = async()=>{
    await updateOldTask(null,filterDate);
    await getTasks(null, filterDate);
  }




  return (
    <div className="home-container">
      <div className="page-head">
        <ReactDatePicker selected={startDate} onChange={handleDatePick} dateFormat="yyyy-MM-dd" customInput={<ExampleCustomInput/>} wrapperClassName='date-picker'/>
        <AddTask getTasks={getTasks} date={filterDate}/>
        <button onClick={handleUpdate}>Pull tasks</button>
      </div>

      <div className="task-container">
        <div className="backlog">
          <h6>Backlog</h6>
          <div className="task-list">
            {tasks.filter(task => task.status === 'backlog').map(backlogTask =>(
            <TaskCard  task={backlogTask} getTasks={getTasks} date={filterDate} key={backlogTask.id}/>
            ))}
          </div>
        </div>
      < div className="doing">
        <h6>Doing</h6>
        <div className="task-list">
        {tasks.filter(task => task.status === 'doing').map(doingTask =>(
        < TaskCard task={doingTask} getTasks={getTasks} date={filterDate} key={doingTask.id}/>
        ))}
        </div>
        </div>
        <div className="done">
          <h6>Done</h6>
          <div className="task-list">
          {tasks.filter(task => task.status === 'done').map(doneTask =>(
          <TaskCard task={doneTask} getTasks={getTasks} date={filterDate} key={doneTask.id}/>
          ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default HomePage;
