import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../lib/api/auth.api";
import { useAuthStore } from "../../stores/auth.store";
export default function RegisterPage() {
  const setTokens = useAuthStore((state) => state.setTokens);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authApi.register({
        email,
        password,
        fullName,
      });

      // auto login
      setTokens(res.accessToken, res.refreshToken);

      navigate("/", { replace: true });
    } catch (err: any) {
      console.error("Register error:", err);

      setError(
        err?.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

        <form onSubmit={handleSubmit}>
          {/* Full name */}
          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            required
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded font-bold hover:bg-blue-600 disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
