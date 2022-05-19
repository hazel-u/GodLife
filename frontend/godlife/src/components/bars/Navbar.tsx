import { Grid, Hidden, Typography } from "@mui/material";

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";
import { useLogout } from "../../hooks/useAuth";
import { useAppSelector } from "../../store/hooks";
import { selectTodayBingo } from "../../store/todayBingo";
import { TextButton } from "../common/Button";
import MobileNavbarDialog from "./MobileNavbarDialog";

const Navbar = () => {
  const isAuth = localStorage.getItem("token");
  const location = useLocation();
  const params = useParams();

  const code = useAppSelector(selectTodayBingo);
  const pageNameList: { [key: string]: string } = {
    list: "이전의 갓생",
    feed: "모두의 갓생",
    "": "모두의 갓생",
    item: "아이템 샵",
    create: "갓생 만들기",
    profile: "프로필",
    bingo: `${code}` === params.bingoId ? "오늘의 갓생" : "",
  };

  const navigate = useNavigate();

  const logout = useLogout();

  return (
    <>
      <Hidden smDown>
        <Grid
          container
          alignItems="end"
          sx={{
            padding: "40px 10px",
            "& .MuiButton-root": {
              fontSize: "20px",
              fontFamily: "BMEULJIRO",
            },
          }}
          columns={5}
        >
          <Grid item sm={1}>
            <TextButton
              onClick={() => {
                if (code && code !== "none") {
                  navigate(`/bingo/${code}`);
                } else {
                  navigate("create");
                }
              }}
              sx={{
                color:
                  location.pathname.split("/")[1] === "bingo" ? "#464646" : "",
              }}
            >
              오늘의 갓생
            </TextButton>
          </Grid>
          <Grid
            item
            sm={1}
            sx={{
              textAlign: "center",
            }}
          >
            <TextButton
              href="/list"
              sx={{
                color:
                  location.pathname.split("/")[1] === "list" ? "#464646" : "",
              }}
            >
              이전의 갓생
            </TextButton>
          </Grid>

          <Grid
            item
            sm={1}
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
          </Grid>

          <Grid
            item
            sm={1}
            sx={{
              textAlign: "center",
            }}
          >
            <TextButton
              href="/feed"
              sx={{
                color:
                  location.pathname.split("/")[1] === "feed" ? "#464646" : "",
              }}
            >
              모두의 갓생
            </TextButton>
          </Grid>

          <Grid
            item
            sm={1}
            sx={{
              textAlign: "end",
            }}
          >
            {isAuth ? (
              <TextButton onClick={() => navigate("/profile")}>
                내 정보
              </TextButton>
            ) : (
              <TextButton onClick={() => navigate("/login")}>로그인</TextButton>
            )}
          </Grid>
        </Grid>
      </Hidden>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        display={{ sm: "none", md: "none" }}
        sx={{
          padding: "40px 10px",
        }}
      >
        <Grid item xs></Grid>
        <Grid
          item
          xs
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontFamily="BMEULJIRO" fontSize={20}>
            {pageNameList[location.pathname.split("/")[1]]}
          </Typography>
        </Grid>
        <Grid item xs>
          {/* <MobileNavbarDialog logout={logout} setOpen={setOpen} /> */}
          <MobileNavbarDialog logout={logout} />
        </Grid>
      </Grid>
    </>
  );
};

export default Navbar;
