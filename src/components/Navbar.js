import { Link } from "react-router-dom";
import '../styles/Navbar.css';
import ProgressCircle from './ProgressCircle';

const Navbar = ({ totalTasks, completedTasks }) => {
  return (
    <nav>
      <h1 className="taskr-heading">
        <span className="taskr-title">Taskr</span>
        <span className="material-symbols-outlined">cognition_2</span>
      </h1>

      <div>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/tasks/new" className="nav-link">+ New Task</Link>
        <Link to="/statistics" className="nav-link">Statistics</Link>
      </div>

      <div className="progress-circle-container">
        <ProgressCircle totalTasks={totalTasks} completedTasks={completedTasks} />
      </div>
    </nav>
  );
};

export default Navbar;
