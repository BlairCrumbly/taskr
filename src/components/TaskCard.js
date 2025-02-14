import '../styles/TaskList.css';

const TaskCard = ({task, handleTaskCompletion, priorityClass}) => {
    


    return(
        <div className= {`taskcard ${priorityClass}`}>
            <div className={`priority-strip`}></div>
            <li key={task.id}>

        <div className='checkbox'>
        <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleTaskCompletion(task.id, task.completed)}
        />
        

        </div>

        <strong>{task.name}</strong> - {task.dueDate}
        <p>{task.description}</p>
        <span>Estimated Time: {task.estimatedTime} hrs</span>
            </li>
        </div>
        

    )

}

export default TaskCard;