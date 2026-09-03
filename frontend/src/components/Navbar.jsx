import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold tracking-wider">
          Enterprise Portal
        </Link>
        <div>
          {token ? (
            <div className="flex items-center space-x-4 text-white">
              <span className="text-indigo-200">
                Welcome, <strong className="text-white">{user.name}</strong> ({user.role})
              </span>
              {user.role === 'Admin' && (
                <Link to="/admin" className="hover:text-indigo-200 transition-colors">
                  Admin Panel
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md transition-colors font-medium text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-indigo-200 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
