import '../styles/TaskList.css';

const TaskCard = ({task, handleTaskCompletion }) => {
    
    



    return(
        <div>
            <li key={task.id}>
        <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleTaskCompletion(task.id)}
        />


        <strong>{task.name}</strong> - {task.dueDate}
        <p>{task.description}</p>
        <span>Estimated Time: {task.estimatedTime} hrs</span>
            </li>
        </div>
        

    )

}

export default TaskCard;