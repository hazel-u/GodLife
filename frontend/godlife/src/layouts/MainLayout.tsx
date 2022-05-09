import { Box } from "@mui/material";

import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/bars/Footer";
import Navbar from "../components/bars/Navbar";
import ShareNavbar from "../components/bars/ShareNavbar";

const MainLayout = () => {
  const isAuth = localStorage.getItem("token");

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 3%",
      }}
    >
      {isAuth ? <Navbar /> : <ShareNavbar />}
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
