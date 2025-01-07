import { Navigate } from 'react-router-dom';
import { AccessControl } from '../accessControl/AccessControl';

interface propsI{
    userRole: keyof typeof AccessControl,
    path: string,
    children: React.ReactNode,
    // AcessControl[userRole] = string
}

const ProtectedRoute:React.FC<propsI> = ({ userRole, path, children }) => {
  const allowedRoutes = AccessControl[userRole]?.routes || [];
  if (!allowedRoutes.includes(path)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
