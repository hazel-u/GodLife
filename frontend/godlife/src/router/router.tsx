import { Navigate, Outlet, useRoutes } from "react-router-dom";
import GodlifeShare from "../pages/bingo/detail/GodlifeShare";
import Join from "../pages/join/Join";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";

export default function Router() {
  const isAuth = localStorage.getItem("token");

  return useRoutes([
    {
      path: "/join",
      element: isAuth ? <Navigate to="/" /> : <Join />,
    },
    {
      path: "/login",
      element: isAuth ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/",
      element: isAuth ? <Outlet /> : <Navigate to="/login" />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/bingo/:bingoId",
          element: <GodlifeShare />,
        },
      ],
    },
  ]);
}
