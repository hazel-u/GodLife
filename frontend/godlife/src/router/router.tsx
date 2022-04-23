import { Navigate, useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ShareLayout from "../layouts/ShareLayout";
import BingoCreate from "../pages/bingo/create/BingoCreateComponents";
import GodlifeShare from "../pages/bingo/detail/GodlifeShare";
import Join from "../pages/join/Join";
import Login from "../pages/login/Login";

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
          path: "/create",
          element: <BingoCreate />,
        },
      ],
    },
    {
      path: "/",
      element: isAuth ? <ShareLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/bingo/:bingoId",
          element: <GodlifeShare />,
        },
      ],
    },
  ]);
}
