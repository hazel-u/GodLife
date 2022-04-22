import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/bars/Footer";
import ShareNavbar from "../components/bars/ShareNavbar";

const ShareLayout = () => {
  return (
    <>
      <ShareNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default ShareLayout;
