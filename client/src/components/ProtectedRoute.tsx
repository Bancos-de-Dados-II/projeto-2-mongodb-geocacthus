import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // Carregando...

  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;
