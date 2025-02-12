import { useEffect, useState, useMemo } from "react";
import '../styles/TaskList.css';
import { useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";
const TaskList = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const { tasks, handleTaskCompletion } = useOutletContext(); 
  const [sortBy, setSortBy] = useState("date")


const handleSortBy = (e) => {
  
  setSortBy(e.target.value)
}



 //! filter
  const visibleTasks = tasks
    .filter((tasks) => !tasks.completed) //hide completed tasks
    .filter((tasks) => tasks.name.toLowerCase().includes(searchQuery.toLowerCase()));

  
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //use setTasks to update the state and target prevTasks 
// to avoid staleness
//make var make it sort the current array of tasks 
//using spread operator 
//.sort((a, b) => )
//use .localeCompare() ?








  return (
    //! search
    
    <div className="centered-container">
      <div className="TaskList">
      <div>


      <select onChange={handleSortBy}>
        <option value="date">Sort by Date</option>
        <option value="A-Z">Sort by A-Z</option>
        <option value="Z-A">Sort by Z-A</option>
      </select>
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
             />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
