import { Box, Stack } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";
import { TextButton } from "../common/Button";

const ShareNavbar = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="end"
      sx={{
        padding: "40px 10px",
        "& .MuiButton-root": {
          fontSize: "20px",
          fontFamily: "BMEULJIRO",
        },
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Logo
          width="85px"
          height="85px"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </Box>

      <Box
        sx={{
          textAlign: "end",
        }}
      >
        <TextButton onClick={() => navigate("/login")}>로그인</TextButton>
      </Box>
    </Stack>
  );
};

export default ShareNavbar;
