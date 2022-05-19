import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Stack, styled } from "@mui/material";

import React, { useState } from "react";

import Footer from "../components/bars/Footer";
import ShareNavbar from "../components/bars/ShareNavbar";
import Landing from "../pages/Landing";
import BingoFeed from "../pages/bingo/feed/BingoFeed";
import Login from "../pages/login/Login";

const StyledIconButton = styled(IconButton)({
  position: "fixed",
  bottom: "10px",
  transition: "0.5s",
  width: "50px",
  height: "50px",
  backgroundColor: "#434343",
  color: "#f3f3f3",
  "&:hover": {
    backgroundColor: "#434343",
    color: "#ffffff",
  },
});

const LandingLayout = () => {
  const [page, setPage] = useState("landing");

  const getPosition = () => {
    switch (page) {
      case "landing":
        return "0";
      case "main":
        return "100%";
      case "login":
        return "-100%";
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
        overflowX: "hidden",
      }}
      id="landing-container"
    >
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          transition: "0.5s",
          left: page === "main" ? "0" : "-100%",
        }}
      >
        <Box
          sx={{ overflowY: "auto" }}
          maxWidth="1200px"
          margin="0 auto"
          padding="0 3%"
        >
          <ShareNavbar setPage={setPage} />
          <BingoFeed />
          <Footer />
        </Box>

        <StyledIconButton
          onClick={() => {
            setPage("landing");
            document.getElementById("landing-container")!.scrollTo(0, 0);
          }}
          sx={{
            left: page === "main" ? "calc(100% - 60px)" : "-50px",
          }}
        >
          <Stack alignItems="center">
            <ArrowForwardIosIcon />
          </Stack>
        </StyledIconButton>
      </Box>

      <Box
        sx={{
          position: "absolute",
          transition: "0.5s",
          left: getPosition(),
          right: page === "main" ? "-100%" : "0",
          height: "100%",
          width: "100%",
          overflowY: "hidden",
        }}
      >
        <Landing setPage={setPage} />
      </Box>

      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          transition: "0.5s",
          right: page === "login" ? "0" : "-100%",
        }}
      >
        <Login setPage={setPage} />

        <StyledIconButton
          onClick={() => {
            setPage("landing");
            document.getElementById("landing-container")!.scrollTo(0, 0);
          }}
          sx={{
            right: page === "login" ? "calc(100% - 60px)" : "-50px",
          }}
        >
          <Stack alignItems="center">
            <ArrowBackIosNewIcon sx={{ paddingRight: "2px" }} />
          </Stack>
        </StyledIconButton>
      </Box>
    </Box>
  );
};

export default LandingLayout;
