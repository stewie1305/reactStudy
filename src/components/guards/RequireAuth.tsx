import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export default function RequireAuth() {
  //1.check Token trong thiet bi ( Mock bang localStorage)
  // const token = localStorage.getItem("accessToken");
  //lay token tu store
  const token = useAuthStore((state) => state.accessToken);
  const location = useLocation(); //Lay thong tin vi tri hien tai
  if (!token) {
    //2.Khong co token -> Da ve "/login"
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  //3. Co token -> cho di tiep vao cac tang ben trong
  return <Outlet />;
}
