import { useAuth } from "@/main";

import { Navigate } from "react-router-dom";

const RoleBasedRedirect = () => {
  const { userRole } = useAuth();
  
  switch (userRole) {
    case "ADMIN":
      return <Navigate to="/admin/dashboard" replace />;
    case "MODERATOR":
      return <Navigate to="/moderator/tasks" replace />;
    case "USER":
    default:
      return <Navigate to="/user/" replace />;
  }
};

export default RoleBasedRedirect