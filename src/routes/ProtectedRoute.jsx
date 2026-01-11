import { useAuth } from "@/main";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuth, userRole } = useAuth();
    
    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }
    
    if (allowedRoles && !allowedRoles.includes(userRole)) {      
      return <Navigate to="/404" replace />;
    }
    
    return children;
};

export default ProtectedRoute