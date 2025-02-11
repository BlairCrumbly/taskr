import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import Statistics from "./components/Statistics";

//! fetch here then pass data as prop

function App() {

  //? possibly change router approach, review lectures <Button as={Link} to="/">Home</Button>

  return (
    <Router> 
      <div className="App">
      <header>Taskr</header>
        <Navbar />
        
        <Routes>
          
          <Route path="/" element={<TaskList />} />  
          {/* <Route path="/task/:id" element={<TaskDetail />} /> */}
          <Route path="/tasks/new" element={<AddTaskForm />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
