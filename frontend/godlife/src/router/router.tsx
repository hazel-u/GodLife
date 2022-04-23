import { Navigate, useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ShareLayout from "../layouts/ShareLayout";
import GodlifeShare from "../pages/bingo/detail/GodlifeShare";
import PreviousBingoList from "../pages/bingo/list/PreviousBingoList";
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
      element: isAuth ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/list",
          element: <PreviousBingoList />,
        },
      ],
    },
    {
      path: "/",
      element: <ShareLayout />,
      children: [
        {
          path: "/bingo/:bingoId",
          element: <GodlifeShare />,
        },
      ],
    },
  ]);
}
