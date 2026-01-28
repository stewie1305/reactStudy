import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

const MainLayout = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.accessToken);
  const clearTokens = useAuthStore((state) => state.clearTokens);
  const handleLogout = () => {
    clearTokens();
    navigate("/login", { replace: true });
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* ====== Header - Tuong nha (co dinh) ===== */}
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-50">
        <nav className="max-w-4xl mx-auto flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold">
            ShopApp
          </NavLink>
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-bold underline"
                  : "hover:text-blue-200"
              }
            >
              Home
            </NavLink>
            {!token && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-bold underline"
                    : "hover:text-blue-200"
                }
              >
                Login
              </NavLink>
            )}
            {token && (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-bold underline"
                      : "hover:text-blue-200"
                  }
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="hover:text-blue-200 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* MAIN CONTAIN - Outlet (thay doi theo url) */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6">
        <Outlet />
        {/* Lo hong than thanh: render cac trang con */}
      </main>

      {/* FOOTER - nen nha (co dinh) */}
      <footer className=" bg-gray-200 p-6 text-center text-sm text-gray-600 ">
        footer
      </footer>
    </div>
  );
};

export default MainLayout;
