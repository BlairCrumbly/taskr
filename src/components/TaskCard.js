import '../styles/TaskList.css';
import { useState } from 'react';
import { FaArrowCircleDown,  FaArrowCircleUp} from "react-icons/fa";
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
            {isOpen ? <FaArrowCircleUp />: <FaArrowCircleDown/>}
        </div>
        
        {isOpen && <div className="task-details"  >
            <p>{task.description}</p>
            <span>Estimated Time: {task.estimatedTime} hrs</span>
          </div>}
    
      </li>
    );
  };



export default TaskCard;