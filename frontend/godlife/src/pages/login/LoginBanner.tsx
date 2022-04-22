import React from "react";
import { Box, Stack } from "@mui/material";

const LoginBanner = () => {
  return (
    <Stack
      sx={{
        height: "90vh",
        margin: "20px",
        backgroundColor: "#F3F3F3",
        padding: "20px",
      }}
      direction="column"
      justifyContent="center"
    >
      <h1>갓생살기</h1>
      <h2>쉽게만 살아가면 재미없어 빙고</h2>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        ipsum praesentium neque sint suscipit blanditiis cumque est veniam nisi
        quae quas, repellat tempore sit nesciunt veritatis, pariatur cum nemo
        nam.
      </h3>
      <h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        ipsum praesentium neque sint suscipit blanditiis cumque est veniam nisi
        quae quas, repellat tempore sit nesciunt veritatis, pariatur cum nemo
        nam.
      </h4>
    </Stack>
  );
};

export default LoginBanner;
