import React from "react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((response) => response.json())
      .then((data) => {
        // !s ort the tasks by dueDate and estimatedTime when they are fetched
        const sortedTasks = data.sort((a, b) => {
          const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          const estimatedTimeA = parseInt(a.estimatedTime) || 0;
          const estimatedTimeB = parseInt(b.estimatedTime) || 0;
          return estimatedTimeB - estimatedTimeA;
        });
        setTasks(sortedTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);
  //? possibly change router approach
  const handleNewTask = (task) => {
    setTasks(prevtasks => [...prevtasks , task])
  }

  return (
    
    <div className="App">
      <header>Taskr</header>
      <Navbar />
      <Outlet context={{handleNewTask, tasks}}/> {/* renders the current routes component */}
    </div>
    
  );
}

export default App;
