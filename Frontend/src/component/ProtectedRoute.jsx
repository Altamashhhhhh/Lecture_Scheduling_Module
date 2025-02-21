import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isLogged, userInfo } = useSelector((state) => state.user);
  const userRole = userInfo?.role;

  if (!isLogged) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;

  return element;
};

export default ProtectedRoute;
