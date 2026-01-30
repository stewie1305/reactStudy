import { Outlet } from "react-router-dom";

import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ====== Header - Tuong nha (co dinh) ===== */}
      <Header />

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
