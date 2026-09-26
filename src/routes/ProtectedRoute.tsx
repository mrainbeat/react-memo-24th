import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.accessToken !== null);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
