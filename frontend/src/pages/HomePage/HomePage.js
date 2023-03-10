import React from "react";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./HomePage.css"
import ReactDatePicker from "react-datepicker";
import GetDate from "../../utils/GetDate";
import { forwardRef } from "react";
import AddTask from "../../components/AddTask/AddTask";
import TaskCard from "../../components/TaskCard/TaskCard";

const HomePage = () => {

  let getDate = GetDate();
  const [tasks, getTasks] = useFetch('http://127.0.0.1:8000/api/task/','GET',null)
  const [startDate, setStartDate] = useState(new Date())
  const [filterDate, setFilterDate] = useState(getDate)
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>{value}</button>));


 const handleDatePick = (date)=>{
  setStartDate(date);
  let tempDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  setFilterDate(tempDate)
 }



  useEffect(() => {
    getTasks();
  }, []);




  return (
    <div className="home-container">
      <ReactDatePicker selected={startDate} onChange={handleDatePick} dateFormat="yyyy-MM-dd" customInput={<ExampleCustomInput/>}/>
      <AddTask getTasks={getTasks}/>

      <ul className="task-group">
      <ul className="backlog">
        <h5>backlog</h5>
        {tasks.filter(task => task.status == 'backlog').map(backlogTask =>(
          <TaskCard task={backlogTask} getTasks={getTasks}/>
          
        ))}
      </ul>
      <ul className="doing">
      <h5>doing</h5>
      {tasks.filter(task => task.status == 'doing').map(doingTask =>(
          <TaskCard task={doingTask} getTasks={getTasks}/>
        ))}
        
      </ul>
      <ul className="done">
      <h5>done</h5>
      {tasks.filter(task => task.status == 'done').map(doneTask =>(
          <TaskCard task={doneTask}/>
        ))}
      </ul>
      </ul>
      
    </div>
  );
};

export default HomePage;
