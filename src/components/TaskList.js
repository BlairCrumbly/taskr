import { useState, useMemo } from "react";
import '../styles/TaskList.css';
import { useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";
import Switch from '@mui/material/Switch';

import FormControlLabel from '@mui/material/FormControlLabel';

const TaskList = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const { tasks, handleTaskCompletion } = useOutletContext(); 
  const [sortBy, setSortBy] = useState("date")
  const [showCompleted, setShowCompleted] = useState(false)
  const [filterInput, setFilterInput] = useState("none")


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
  const query = e.target.value.trim();
  setSearchQuery(query.length > 0 ? query : "");
};

const handleTodoChange = () => {
  setShowCompleted(prevState => !prevState);
};

const handleColorFilterChange = (e) => {
  setFilterInput(e.target.value)
}

 //! filters

const filteredTasks = tasks.filter((task) => {
  const taskName = task.name.toLowerCase();
  const normalizedSearchQuery = searchQuery.toLowerCase();

  //! check if the task matches the search query
  const matchesSearch = taskName.includes(normalizedSearchQuery);
  
  //! if there's no search query or the task matches, keep it
  return (searchQuery === "" || matchesSearch) && 
         (filterInput === "none" || colorPriority(task) === filterInput);
});

//! sorting tasks based on the search query and other criteria
const sortedTasks = useMemo(() => {
  return [...filteredTasks]
    .sort((a, b) => {
      const normalizedSearchQuery = searchQuery.toLowerCase();

      //! if there's a search query, prioritize tasks whose name starts with the query
      if (searchQuery) {
        const startsWithA = a.name.toLowerCase().startsWith(normalizedSearchQuery);
        const startsWithB = b.name.toLowerCase().startsWith(normalizedSearchQuery);

        //! prioritize tasks where the name starts with the search query
        if (startsWithA && !startsWithB) return -1;
        if (!startsWithA && startsWithB) return 1;
      }

      //! if no search query, fallback to other sorting 
      if (sortBy === "date") {
        const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
        if (dateComparison !== 0) return dateComparison;

        const estimatedTimeA = parseInt(a.estimatedTime) || 0;
        const estimatedTimeB = parseInt(b.estimatedTime) || 0;
        return estimatedTimeB - estimatedTimeA;
      } else if (sortBy === "Z-A") {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      } else {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }
    })
    .filter((task) => (showCompleted ? task.completed : !task.completed));
}, [filteredTasks, searchQuery, sortBy, showCompleted]);







return (
  <div className="centered-container">
    <div className="TaskList">
      {/* Conditionally render filters based on the presence of the search query */}
      {!searchQuery && (
        <div className="DropDowns">
          <select onChange={handleSortByChange}>
            <option value="date">Sort by Date</option>
            <option value="A-Z">Sort by A-Z</option>
            <option value="Z-A">Sort by Z-A</option>
          </select>

          <select onChange={handleColorFilterChange}>
            <option value="none">None</option>
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
      )}

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Tasks */}
      {sortedTasks.length > 0 ? (
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
      ) : (
        <p className="no-results-message">Sorry, didn't find anything. ):</p> // Display message when no tasks are found
      )}
    </div>
  </div>
);
};

export default TaskList;
