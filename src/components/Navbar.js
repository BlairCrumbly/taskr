import { Link, useNavigate } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div>
        
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/tasks/new" className="nav-link">+ New Task</Link>
        <Link to="/statistics" className="nav-link">Statistics</Link>
      </div>
    </nav>
  );
};

export default Navbar;