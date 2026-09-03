import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Fix jwt-decode import

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Role not authorized
      return <Navigate to="/dashboard" replace />;
    }

    // Authorized
    return <Outlet />;
  } catch (error) {
    console.error('Invalid token', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
