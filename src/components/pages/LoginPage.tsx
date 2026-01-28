import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { authApi } from "../../lib/api/auth.api";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const setTokens = useAuthStore((state) => state.setTokens);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tokens = await authApi.login({ email, password });

      setTokens(tokens.accessToken, tokens.refreshToken);

      // redirect ve trang truoc do hoac "/"
      const from =
        (location.state as { from?: { pathname: string } })?.from?.pathname ||
        "/";

      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message || "dang nhap that bai. Kiem tra console",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded font-bold hover:bgg-blue-700"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500 font-semibold">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
