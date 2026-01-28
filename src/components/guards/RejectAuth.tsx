import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export default function RejectAuth() {
  //1. check token
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  if (token) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }
  //chua login thi ve LoginPage
  return <Outlet />;
}
