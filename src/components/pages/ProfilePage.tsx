import { useEffect, useState } from "react";
import { authApi, type User } from "../../lib/api/auth.api";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authApi.getMe();
        console.log("profile", profile);
        setUser(profile);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile(); //khac login o cho, login an ms goi api, con thg user no tu render khi vao luon
  }, []);

  return (
    <div className="p-10 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {loading && <p className="text-gray-500">Đang tải thông tin...</p>}

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user?.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Tên người dùng</p>
          <p className="font-medium">{user?.fullName}</p>
        </div>

        <p className="text-green-600 font-medium">
          Chào mừng bạn đã trở lại 🎉
        </p>
      </div>
    </div>
  );
}
