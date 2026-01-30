import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { authApi } from "../../lib/api/auth.api";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
    <div className="flex items-center justify-center min-h-screen from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl fomt-bold">Welcome back</CardTitle>
          <CardDescription>
            Hoc Axios Interceptor & Service Layer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Chưa có tài khoản? </span>
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Đăng kí ngay
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
