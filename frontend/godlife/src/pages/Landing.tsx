import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

import LoginBannerImage1 from "../assets/images/loginBannerImage1.webp";
import LoginBannerImage2 from "../assets/images/loginBannerImage2.webp";
import Stamp from "../assets/images/stamp.webp";
import { BlackButton, OutlinedButton } from "../components/common/Button";

const Landing = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(1550));

  const navigate = useNavigate();

  return (
    <>
      <Box
        position="absolute"
        sx={(theme) => ({
          top: "-20px",
          [theme.breakpoints.down(1550)]: {
            top: "60vh",
          },
          [theme.breakpoints.down("sm")]: {
            top: "70vh",
          },
          left: fullScreen ? "calc(50% - 164.5px)" : "50px",
        })}
      >
        <img src={LoginBannerImage1} alt="banner 1" />
      </Box>

      <Box
        position="absolute"
        sx={{
          bottom: "-40px",
          right: "50px",
          display: fullScreen ? "none" : "block",
        }}
      >
        <img
          src={LoginBannerImage2}
          alt="banner 2"
          style={{ width: "300px" }}
        />
      </Box>

      <Stack
        sx={(theme) => ({
          height: "100%",
          textAlign: "center",
          "& p": {
            zIndex: 2,
          },
          [theme.breakpoints.down(1550)]: {
            height: "80%",
          },
        })}
        alignItems="center"
        justifyContent={fullScreen ? "center" : "center"}
        padding={3}
      >
        <Box position="relative">
          <Typography
            sx={{ fontFamily: "BMEULJIRO", fontSize: "80px" }}
            variant="h1"
          >
            God <span style={{ fontFamily: "Reggae One" }}>生</span>
          </Typography>

          <img
            src={Stamp}
            alt="stamp"
            style={{
              position: "absolute",
              top: "-59px",
              left: "-69px",
              opacity: "30%",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontFamily: "BMEULJIRO",
            fontSize: "40px",
            marginBottom: "30px",
            zIndex: 1,
            wordBreak: "keep-all",
          }}
          variant="h2"
        >
          한 번 살아보시지 않으렵니까?
        </Typography>

        <Typography fontSize={20} variant="h3">
          매일의 갓생 목표를 달성하고, <br />
          친구들과 함께 도전을 이어가시오.
        </Typography>

        <Stack alignItems="center" width="100%" marginY={5} spacing={2}>
          <Stack
            direction="row"
            width="100%"
            spacing={1}
            justifyContent="center"
          >
            <BlackButton
              onClick={() => setPage("main")}
              sx={{
                maxWidth: "200px",
                boxShadow:
                  "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              }}
            >
              모두의 갓생 보기
            </BlackButton>
            <BlackButton
              onClick={() => setPage("login")}
              sx={{
                maxWidth: "200px",
                boxShadow:
                  "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              }}
            >
              로그인하러 가기
            </BlackButton>
          </Stack>
          <OutlinedButton
            onClick={() => navigate("/survey")}
            sx={{
              maxWidth: "300px",
              boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            }}
            variant="outlined"
          >
            갓생러 테스트하기
          </OutlinedButton>
        </Stack>
      </Stack>
    </>
  );
};

export default Landing;
