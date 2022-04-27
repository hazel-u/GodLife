import { Navigate, useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ShareLayout from "../layouts/ShareLayout";
import NotFound from "../pages/NotFound";
import BingoCreate from "../pages/bingo/create/BingoCreateComponents";
import GodlifeShare from "../pages/bingo/detail/GodlifeShare";
import PreviousBingoList from "../pages/bingo/list/PreviousBingoList";
import Join from "../pages/join/Join";
import KakaoAuth from "../pages/login/KakaoAuth";
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
      path: process.env.REACT_APP_KAKAO_REDIRECT_PATH,
      element: <KakaoAuth />,
    },
    {
      path: "/",
      element: isAuth ? <MainLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/create",
          element: <BingoCreate />,
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
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
}
