import {
  Grid,
  Hidden,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";
import { useLogout } from "../../hooks/useAuth";
import Profile from "../../pages/profile/Profile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { selectTodayBingo } from "../../store/todayBingo";
import { TextButton } from "../common/Button";
import MobileNavbarDialog from "./MobileNavbarDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const params = useParams();

  const code = useAppSelector(selectTodayBingo);
  const pageNameList: { [key: string]: string } = {
    list: "이전의 갓생",
    group: "내 그룹",
    item: "아이템 샵",
    create: "갓생 만들기",
    bingo: `${code}` === params.bingoId ? "오늘의 갓생" : "",
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = useLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Profile open={open} setOpen={setOpen} />

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
            <Tooltip title={"서비스 준비중입니다."}>
              <TextButton
                onClick={() => {
                  dispatch(
                    setSnackbar({
                      open: true,
                      message: "서비스 준비중입니다.",
                      severity: "info",
                    })
                  );
                }}
                sx={{
                  color:
                    location.pathname.split("/")[1] === "group"
                      ? "#464646"
                      : "",
                }}
              >
                모두의 갓생
              </TextButton>
            </Tooltip>
          </Grid>

          <Grid
            item
            sm={1}
            sx={{
              textAlign: "end",
            }}
          >
            <TextButton
              id="basic-button"
              aria-controls={menuOpen ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? "true" : undefined}
              onClick={handleClick}
            >
              내 정보
            </TextButton>
          </Grid>
        </Grid>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setOpen(true);
              handleClose();
            }}
          >
            프로필
          </MenuItem>
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </Menu>
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
          <MobileNavbarDialog logout={logout} setOpen={setOpen} />
        </Grid>
      </Grid>
    </>
  );
};

export default Navbar;
