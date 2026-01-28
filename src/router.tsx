import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import App from "./App";
import RequireAuth from "./components/guards/RequireAuth";
import ProfilePage from "./components/pages/ProfilePage";
import RejectAuth from "./components/guards/RejectAuth";
import RegisterPage from "./components/pages/RegisterPage";

//1. Su dung createBrowserRouter - API moi nhat cua v6
export const router = createBrowserRouter([
  {
    path: "/", // duong dan goc
    element: <App />, //Layout boc ben ngoai (cai nha)
    children: [
      //cac trang con (noi that)
      {
        index: true, //trang mac dinh khi vao "/"
        element: <HomePage />,
      },
      {
        element: <RejectAuth />,
        children: [
          {
            path: "login", // Duong dan "/Login"
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },

      //Protected route
      {
        element: <RequireAuth />, // bao ve cac trang con ben duoi
        children: [
          {
            path: "profile", // duong dan "/profile"
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);
