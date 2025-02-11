import { useEffect, useState } from "react";
import '../styles/TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  //! SEARCH
 
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //! sort filtered tasks by the closest match to the search query in alphabetical order
  const sortedFilteredTasks = filteredTasks.sort((a, b) => {
    const query = searchQuery.toLowerCase();

    //! Check if the query is found in both task names
    const indexA = a.name.toLowerCase().indexOf(query);
    const indexB = b.name.toLowerCase().indexOf(query);

    //!if both tasks contain the query, sort by the position of the query in the name
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    //! if only one task contains the query, prioritize it
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    //! if neither task contains the query, fallback to alphabetical sorting
    return a.name.localeCompare(b.name);
  });


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="centered-container">
      <div className="TaskList">
        
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <ul>
          {sortedFilteredTasks.map((task) => (
            <li key={task.id}>
              <strong>{task.name}</strong> - {task.dueDate}
              <p>{task.description}</p>
              <span>Estimated Time: {task.estimatedTime} hrs</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
