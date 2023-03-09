import React from "react";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./HomePage.css"
import ReactDatePicker from "react-datepicker";
import GetDate from "../../utils/GetDate";



const HomePage = () => {

  let getDate = GetDate();
  const [tasks, getTasks] = useFetch('http://127.0.0.1:8000/api/task/','GET',null)
  const [startDate, setStartDate] = useState(new Date())
  const [filterDate, setFilterDate] = useState(getDate)

 const handleDatePick = (date)=>{
  setStartDate(date);
  let tempDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  setFilterDate(tempDate)
 }



  useEffect(() => {
    getTasks();
  }, []);




  return (
    <div className="container">
      <ReactDatePicker selected={startDate} onChange={handleDatePick} dateFormat="yyyy-MM-dd"/>
      <button onClick={()=>{console.log(filterDate)}}>GET DATE</button>
      <ul className="task-group">
      <ul className="backlog">
        <h5>backlog</h5>
        {tasks.filter(task => task.status == 'backlog').map(backlogTask =>(
          <li>{backlogTask.name} </li>
        ))}
      </ul>
      <ul className="doing">
      <h5>doing</h5>
      {tasks.filter(task => task.status == 'doing').map(doingTask =>(
          <li>{doingTask.name}</li>
        ))}
        
      </ul>
      <ul className="done">
      <h5>done</h5>
      {tasks.filter(task => task.status == 'done').map(doneTask =>(
          <li>{doneTask.name}</li>
        ))}
      </ul>
      </ul>
      
    </div>
  );
};

export default HomePage;
