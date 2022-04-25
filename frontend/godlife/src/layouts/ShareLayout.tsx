import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/bars/Footer";
import Navbar from "../components/bars/Navbar";
import ShareNavbar from "../components/bars/ShareNavbar";

const ShareLayout = () => {
  const isAuth = localStorage.getItem("token");

  return (
    <>
      {isAuth ? <Navbar /> : <ShareNavbar />}
      <Outlet />
      <Footer />
    </>
  );
};

export default ShareLayout;
