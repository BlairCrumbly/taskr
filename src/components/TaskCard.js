import '../styles/TaskList.css';
import { useState, useEffect } from 'react';

import { IoIosArrowUp,  IoIosArrowDown} from "react-icons/io";



const TaskCard = ({task, handleTaskCompletion, priorityClass}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDetails = () =>{
        setIsOpen(previsOpen => !previsOpen)
    }
  //todo only apply strike-through when transitioning from uncompleted to completed


  return (
<li
  className={`taskcard ${priorityClass} ${task.fadingOut ? "fade-out" : "fade-in"}`} //* apply fade effect
  key={task.id}
>     
    <div onClick={toggleDetails} className='arrows'>
        {isOpen ? <IoIosArrowUp size={22} /> : <IoIosArrowDown size={22}/>}
    </div>
  
  
  <div className="priority-strip"></div>

  <div className="task-header">
  {/* Apply strike-through when the task transitions from uncompleted to completed */}
  <strong className={task.addingLineThrough ? "crossed-out" : ""} style={{ marginRight: '10px' }}>
    {task.name}
  </strong>- {task.dueDate}

    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => handleTaskCompletion(task.id, task.completed)}
      className="task-checkbox"
    />
  </div>



  <div className={`task-details ${isOpen ? "open" : "closed"}`}>
    <p>{task.description}</p>
    <span>Estimated Time: {task.estimatedTime} hrs</span>
  </div>
</li>



  )}



export default TaskCard;