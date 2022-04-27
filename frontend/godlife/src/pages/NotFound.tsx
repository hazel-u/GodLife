import { Stack, Typography } from "@mui/material";

import React from "react";

import NotFoundImage from "../assets/images/404NotFound.svg";
import { OutlinedButton } from "../components/common/Button";

const NotFound = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <img src={NotFoundImage} alt="404 Not Found" style={{ width: "44%" }} />
      <Typography
        sx={(theme) => ({
          fontFamily: "BMEULJIRO",
          fontSize: "36px",
          margin: "44px",
          [theme.breakpoints.down("md")]: {
            fontSize: "24px",
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
          },
        })}
      >
        쉽게만 살아가면 재미없어 빙고
      </Typography>
      <OutlinedButton variant="outlined" href="/" sx={{ width: "44%" }}>
        돌아가기
      </OutlinedButton>
    </Stack>
  );
};

export default NotFound;
