import { useEffect, useState } from "react";
import { LoadingState } from "../ui/StatusStates";

export default function EffectDemoPage() {
  const [count, setCount] = useState(1);
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  //rule 1 sync vs brower API
  useEffect(() => {
    document.title = `Effect Demo - Count: ${count}`;
  }, [count]);

  //rule 2 & 3: sync vs api server (chay khi user thay doi)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    //gia lap fetch api
    const timer = setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${count}`)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            setUser(data);
            setLoading(false);
          }
        });
    }, 1000);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [count]);
  const handleIncrease = () => {
    setCount((pre) => pre + 1);
  };
  return (
    // <div className="min-h-screen flex items-center justify-center bg-slate-100">
    //   <div className="bg-white p-8 rounded-2xl shadow-xl w-80 text-center">
    //     <h2 className="text-2xl font-bold mb-4">Count: {count}</h2>
    //     <button
    //       onClick={handleIncrease}
    //       className="
    //     px-6 py-2 w-full
    //     rounded-xl
    //     bg-gray-500 from-indigo-500 to-purple-500
    //     text-white font-semibold
    //     shadow-lg
    //     hover:scale-105 hover:shadow-xl
    //     transition-all duration-200
    //     active:scale-95
    //   "
    //     >
    //       Increase
    //     </button>
    //   </div>
    // </div>
    <div>
      {loading ? (
        <LoadingState />
      ) : (
        <div className="p-6 bg-purple-50 rounded-2xl border border-b-purple-500">
          <p>User Data</p>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
        </div>
      )}
      <button
        onClick={handleIncrease}
        className="
        px-6 py-2 w-full
        rounded-xl
        bg-gray-500 from-indigo-500 to-purple-500
        text-white font-semibold
        shadow-lg
        hover:scale-105 hover:shadow-xl
        transition-all duration-200
        active:scale-95
      "
      >
        Increase
      </button>
    </div>
  );
}
