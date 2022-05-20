import GroupIcon from "@mui/icons-material/Group";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  Typography,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

import Stamp from "../../../assets/images/stamp.webp";
import { useAppDispatch } from "../../../store/hooks";
import { setLoading } from "../../../store/loading";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";
import BingoFeedAllUserSearch from "./BingoFeedAllUserSearch";
import BingoFeedDateSearch from "./BingoFeedDateSearch";
import BingoFeedItem from "./BingoFeedItem";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const BingoFeed = () => {
  const isAuth = localStorage.getItem("token");
  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(-1);
  const [selectedMenu, setSelectedMenu] = useState("내 피드");
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useAppDispatch();

  const getMainBingoFeed = () => {
    dispatch(setLoading(true));
    axios.get(`feed/main`).then((res) => {
      setSelectedMenu("모두의 피드");
      setBingoList(res.data);
      setBingoCount(res.data.length);
      dispatch(setLoading(false));
    });
  };

  const getBingoFeed = () => {
    dispatch(setLoading(true));
    axiosWithToken.get(`feed`).then((res) => {
      if (res.data.length) {
        setSelectedMenu("내 피드");
        setShowMenu(true);
        setBingoList(res.data);
        setBingoCount(res.data.length);
        dispatch(setLoading(false));
      } else {
        getMainBingoFeed();
      }
    });
  };

  useEffect(() => {
    if (bingoCount === -1 && isAuth) {
      getBingoFeed();
    } else if (bingoCount === -1 && !isAuth) {
      getMainBingoFeed();
    }
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack justifyContent="center" alignItems="center">
      {!isAuth && (
        <Box textAlign="start" width="100%">
          <Typography fontFamily="BMEULJIRO" fontSize={36}>
            {new Date().getMonth() + 1}월 {new Date().getDate()}일 모두의 갓생
          </Typography>
          <Typography fontSize={20}>오늘의 갓생러들을 확인해보세요!</Typography>
        </Box>
      )}
      {isAuth && showMenu && (
        <Stack
          direction="row"
          justifyContent="space-between"
          padding={1}
          width="100%"
        >
          <Box>
            <button
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className={fullScreen ? "more-button" : "feed-user-search"}
              style={{
                width: fullScreen ? "24px" : "110px",
                transform: "translate(-10px, 5px)",
              }}
            >
              {fullScreen ? (
                <MoreVertIcon />
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {selectedMenu}
                  <KeyboardArrowDownIcon />
                </Stack>
              )}
            </button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setSelectedMenu("내 피드");
                  handleClose();
                  getBingoFeed();
                }}
                disableRipple
              >
                <StarIcon />내 피드
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedMenu("모두의 피드");
                  handleClose();
                  getMainBingoFeed();
                }}
                disableRipple
              >
                <GroupIcon />
                모두의 피드
              </MenuItem>
            </StyledMenu>
          </Box>

          <Stack direction="row">
            <BingoFeedAllUserSearch />
            <BingoFeedDateSearch setBingoList={setBingoList} />
          </Stack>
        </Stack>
      )}

      {-1 < bingoCount && bingoList.length === 0 ? (
        <>
          <Box textAlign={"center"} margin={"20%"}>
            <img src={Stamp} alt="stamp" />
            <Typography paddingY={5}>
              {isAuth &&
                bingoCount === 0 &&
                "다른 갓생러들을 팔로우하고 갓생 피드를 채워보세요."}
              {isAuth &&
                bingoCount !== 0 &&
                "찾으시는 갓생이 존재하지 않습니다.."}
              {!isAuth &&
                bingoCount === 0 &&
                "모두의 갓생이 존재하지 않습니다."}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          {bingoList.map((bingo) => (
            <BingoFeedItem
              bingo={bingo}
              getBingoFeed={getBingoFeed}
              key={bingo.id}
            />
          ))}
        </>
      )}
    </Stack>
  );
};

export default BingoFeed;
