import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return <>{children}</>;
};