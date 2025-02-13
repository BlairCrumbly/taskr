import '../styles/TaskList.css';

const TaskCard = ({task, handleTaskCompletion, }) => {
    
    const colorPriority = () =>{
        const today = new Date();
        const dueDate = new Date(task.dueDate)
        const redZone = 7;
        const yellowZone = 14;

        if(dueDate < today && dueDate.getDay() !== today.getDay()){
            return 'overdue'
        }
        const differenceInDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
        
        if(differenceInDays < redZone){
            return 'red'
        }else if (differenceInDays < yellowZone  && differenceInDays >= redZone){
            return 'yellow'
        } else{
            return 'green'
        } 
        

    }

    const priorityClass = colorPriority()


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