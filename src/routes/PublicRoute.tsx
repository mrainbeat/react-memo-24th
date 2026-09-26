import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function PublicRoute() {
  const isAuthenticated = useAuthStore((s) => s.accessToken !== null);

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
