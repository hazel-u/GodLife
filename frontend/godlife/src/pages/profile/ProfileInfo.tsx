import SettingsIcon from "@mui/icons-material/Settings";
import {
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogout } from "../../hooks/useAuth";
import { selectBingo } from "../../store/bingo";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user";
import ProfileInfoMessage from "./ProfileInfoMessage";

export interface ProfileInfoProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileInfo(props: ProfileInfoProps) {
  const { setOpen } = props;
  const { name, info } = useAppSelector(selectUser);
  const { godCount, serialGodCount } = useAppSelector(selectBingo);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = useLogout();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "65px",
          "& p": {
            fontFamily: "BMEULJIRO",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: fullScreen ? 26 : 30,
            fontFamily: "BMEULJIRO",
          }}
        >
          {name} 님의 프로필
        </Typography>
        <IconButton
          aria-controls={menuOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? "true" : undefined}
          onClick={handleClick}
        >
          <SettingsIcon />
        </IconButton>
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
            회원정보 수정
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/survey");
            }}
          >
            갓생러 테스트 하러 가기
          </MenuItem>
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </Menu>
      </Stack>
      <ProfileInfoMessage info={info} />
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography sx={{ whiteSpace: "pre-line" }}>
          갓생 달성 {godCount}일 | 연속 갓생 달성 {serialGodCount}일
        </Typography>
      </Stack>
    </>
  );
}

export default ProfileInfo;
