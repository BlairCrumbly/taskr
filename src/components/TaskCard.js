import '../styles/TaskList.css';
import { useState } from 'react';
// IoIosArrowDropupCircle
import { IoIosArrowUp,  IoIosArrowDown} from "react-icons/io";

const TaskCard = ({task, handleTaskCompletion, priorityClass}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDetails = () =>{
        setIsOpen(previsOpen => !previsOpen)
    }
  // Only apply strike-through when transitioning from uncompleted to completed


  return (
<li
  className={`taskcard ${priorityClass} ${task.fadingOut ? "fade-out" : "fade-in"}`} // Apply fade effect
  key={task.id}
>
  <div className="priority-strip"></div>

  <div className="task-header">
    {/* Apply strike-through when the task transitions from uncompleted to completed */}
    <strong className={task.addingLineThrough ? "crossed-out" : ""}>
      {task.name}
    </strong>
    - {task.dueDate}

    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => handleTaskCompletion(task.id, task.completed)}
      className="task-checkbox"
    />
  </div>

  <div onClick={toggleDetails}>
    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
  </div>

  <div className={`task-details ${isOpen ? "open" : "closed"}`}>
    <p>{task.description}</p>
    <span>Estimated Time: {task.estimatedTime} hrs</span>
  </div>
</li>



  )}



export default TaskCard;