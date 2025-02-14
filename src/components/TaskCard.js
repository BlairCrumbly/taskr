import '../styles/TaskList.css';

const TaskCard = ({task, handleTaskCompletion, priorityClass}) => {
    


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
  
          <div className="task-details">
            <p>{task.description}</p>
            <span>Estimated Time: {task.estimatedTime} hrs</span>
          </div>

      </li>
    );
  };



export default TaskCard;