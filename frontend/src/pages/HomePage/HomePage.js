import React from "react";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./HomePage.css"
import ReactDatePicker from "react-datepicker";
import GetDate from "../../utils/GetDate";
import { forwardRef } from "react";
import AddTask from "../../components/AddTask/AddTask";
import TaskCard from "../../components/TaskCard/TaskCard";
import { Col, Row } from "react-bootstrap";

const HomePage = () => {

  let date = GetDate();
  const [tasks, getTasks] = useFetch('http://127.0.0.1:8000/api/task/','GET',null)
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
    getTasks(null, null ,filterDate);
  }, [filterDate]);




  return (
    <div className="home-container">
      <div className="page-head">
        <li><ReactDatePicker selected={startDate} onChange={handleDatePick} dateFormat="yyyy-MM-dd" customInput={<ExampleCustomInput/>}/></li>
        <li><AddTask getTasks={getTasks} date={filterDate}/></li>
      </div>

      <div className="task-container">
        <div className="backlog">
          <h6>Backlog</h6>
          <div className="task-list">
            {tasks.filter(task => task.status == 'backlog').map(backlogTask =>(
            <TaskCard  task={backlogTask} getTasks={getTasks} date={filterDate}/>
            ))}
          </div>
        </div>
      < div className="doing">
        <h6>Doing</h6>
        <div className="task-list">
        {tasks.filter(task => task.status == 'doing').map(doingTask =>(
        <TaskCard task={doingTask} getTasks={getTasks} date={filterDate}/>
        ))}
        </div>
        </div>
        <div className="done">
          <h6>Done</h6>
          <div className="task-list">
          {tasks.filter(task => task.status == 'done').map(doneTask =>(
          <TaskCard task={doneTask}/>
          ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default HomePage;
