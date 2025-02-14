import { useState, useMemo } from "react";
import '../styles/TaskList.css';
import { useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const TaskList = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const { tasks, handleTaskCompletion } = useOutletContext(); 
  const [sortBy, setSortBy] = useState("date")
  const [showCompleted, setShowCompleted] = useState(false)
  const [filterInput, setFilterInput] = useState("none")
    const [checked, setChecked] = useState(false);


    const colorPriority = (task) =>{
    const today = new Date();
    const dueDate = new Date(task.dueDate)
    const redZone = 7;
    const yellowZone = 14;

    if(dueDate < today && dueDate.getDay() !== today.getDay()){
        return 'overdue'
    }
    const differenceInDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if(differenceInDays < redZone){
        return 'red'
    }else if (differenceInDays < yellowZone  && differenceInDays >= redZone){
        return 'yellow'
    } else{
        return 'green'
    } 
}


const handleSortByChange = (e) => {
  
  setSortBy(e.target.value)
}

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

const handleTodoChange = () => {
  setShowCompleted(prevState => !prevState);
};

const handleColorFilterChange = (e) => {
  setFilterInput(e.target.value)
}



 //! filters

 const visibleTasks = tasks
 .filter((task) => (showCompleted ? task.completed : !task.completed))
 .filter((task) => task.name.toLowerCase().includes(searchQuery.toLowerCase()))
 .filter((task) => filterInput === "none" || colorPriority(task) === filterInput);


  
//?change
const sortedTasks = useMemo(() => {
  return [...visibleTasks].sort((a, b) => {
    if (sortBy === "date"){
      const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateComparison !== 0) return dateComparison;

      const estimatedTimeA = parseInt(a.estimatedTime) || 0;
      const estimatedTimeB = parseInt(b.estimatedTime) || 0;
      return estimatedTimeB - estimatedTimeA;

    }
    else if(sortBy === "Z-A"){
      return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    }
    else{
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    }
  });
}, [visibleTasks, sortBy]);
  return (
    
    
    <div className="centered-container">
      <div className="TaskList">
      
      <div className="DropDowns">


      <select onChange={handleSortByChange}>
        <option value="date">Sort by Date</option>
        <option value="A-Z">Sort by A-Z</option>
        <option value="Z-A">Sort by Z-A</option>
      </select>

      <select onChange={handleColorFilterChange}>
        <option value="none">none</option>
        <option value="overdue">Overdue</option>
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
      </select>

      <FormControlLabel
        control={<Switch color="secondary" checked={showCompleted} onChange={handleTodoChange} />}
        label="Show completed tasks"
        labelPlacement="end"
        className="switch-label"
      />



      </div>


      

      
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        


        {/* Tasks + hiding completed tasks */}
        <ul>
          {sortedTasks.map((task) => (
            <TaskCard 
            key={task.id}
            task={task} 
            handleTaskCompletion={handleTaskCompletion}
            priorityClass={colorPriority(task)}
             />

          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
