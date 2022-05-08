import { Box } from "@mui/material";

import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/bars/Footer";
import Navbar from "../components/bars/Navbar";

const MainLayout = () => {
  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
