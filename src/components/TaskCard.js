import '../styles/TaskList.css';
import { useState } from 'react';
// IoIosArrowDropupCircle
import { IoIosArrowUp,  IoIosArrowDown} from "react-icons/io";

const TaskCard = ({task, handleTaskCompletion, priorityClass}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDetails = () =>{
        setIsOpen(previsOpen => !previsOpen)
    }

    return(
        <li className={`taskcard ${priorityClass}`} key={task.id}>
        <div className="priority-strip"></div>
  
        <div className="checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleTaskCompletion(task.id, task.completed)}
          />
        </div>
  
        <div className="task-header">
          <strong>{task.name}</strong> - {task.dueDate}
        </div>
        <div onClick={toggleDetails}>
            {isOpen ? <IoIosArrowUp />: <IoIosArrowDown/>}
        </div>
        
        <div className={`task-details ${isOpen ? "open" : "closed"}`}>
            <p>{task.description}</p>
            <span>Estimated Time: {task.estimatedTime} hrs</span>
        </div>
    
      </li>
    );
  };



export default TaskCard;