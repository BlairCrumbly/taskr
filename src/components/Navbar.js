import {Link} from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = () => {
  

  return (

    <nav>
    <>
      <h1 className="taskr-heading">
      <span className="taskr-title">Taskr</span>
      <span className="material-symbols-outlined">cognition_2</span>
      </h1>
    </>
      
      <div>
        
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/tasks/new" className="nav-link">+ New Task</Link>
        <Link to="/statistics" className="nav-link">Statistics</Link>
      </div>
    </nav>
  );
};

export default Navbar;