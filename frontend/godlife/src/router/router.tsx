import { useRoutes } from "react-router-dom";
import Join from "../pages/join/Join";
import Login from "../pages/login/Login";

export default function Router() {
  return useRoutes([
    {
      path: "/join",
      element: <Join />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
}
