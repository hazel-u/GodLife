import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/bars/Footer";
import Navbar from "../components/bars/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar menuName={"네브바"} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
