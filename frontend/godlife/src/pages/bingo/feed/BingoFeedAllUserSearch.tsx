import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";

import { OutlinedButton } from "../../../components/common/Button";
import { useAppDispatch } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";

const BingoFeedAllUserSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  const searchUser = (nickName: string) => {
    if (nickName) {
      axiosWithToken
        .post(`feed/user`, { keyword: nickName })
        .then((res) => {
          setResult(
            res.data.filter((data: { name: string }) => {
              return data.name !== "deleteUserName";
            })
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setSearchInput("");
    setResult([]);
  };

  const [result, setResult] = useState<
    {
      following: boolean;
      godCount: number;
      name: string;
      serialGodCount: number;
    }[]
  >([]);

  const dispatch = useAppDispatch();
  const manageFollow = (user: {
    following: boolean;
    godCount: number;
    name: string;
    serialGodCount: number;
  }) => {
    let request;
    if (user.following) {
      request = axiosWithToken.delete(`feed/follow/${user.name}`);
    } else {
      request = axiosWithToken.post(`feed/follow/${user.name}`);
    }
    request
      .then(() => {
        searchUser(searchInput);
        dispatch(
          setSnackbar({
            open: true,
            message: user.following
              ? `${user.name}님을 언팔로우합니다.`
              : `${user.name}님을 팔로우합니다.`,
            severity: "success",
          })
        );
      })
      .catch(() =>
        dispatch(
          setSnackbar({
            open: true,
            message: "다시 시도해주세요.",
            severity: "error",
          })
        )
      );
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          style: !fullScreen
            ? { minWidth: "min(60%, 600px)", width: "60%" }
            : {},
        }}
        fullScreen={fullScreen}
      >
        <DialogTitle sx={{ fontFamily: "BMEULJIRO", fontSize: 24 }}>
          갓생러 찾기
        </DialogTitle>
        <DialogContent sx={{ margin: "0 20px" }}>
          <input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              searchUser(e.target.value);
            }}
            type="text"
            placeholder="닉네임"
            className="feed-user-search"
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <Box
            sx={{
              overflowY: "auto",
              height: fullScreen ? "calc(100% - 100px)" : "40vh",
            }}
          >
            {searchInput === "" ? (
              <Typography fontFamily="BMEULJIRO">
                찾으시는 갓생러의 닉네임을 입력해주세요.
              </Typography>
            ) : (
              <>
                {result.length !== 0 ? (
                  <>
                    {result.map((user) => (
                      <Stack
                        key={user.name}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Box paddingY={1}>
                          <Typography fontFamily="BMEULJIRO">
                            {user.name}
                          </Typography>
                          <Typography fontSize={12} color="#939393">
                            {user.godCount}일 째 갓생 달성 중
                          </Typography>
                          <Typography fontSize={12} color="#939393">
                            {user.serialGodCount}일 째 연속 갓생 달성 중
                          </Typography>
                        </Box>

                        <Box>
                          <IconButton
                            sx={{
                              color: user.following ? "#A11803" : "#464646",
                            }}
                            onClick={() => manageFollow(user)}
                          >
                            <PersonIcon />
                          </IconButton>
                        </Box>
                      </Stack>
                    ))}
                  </>
                ) : (
                  <Typography fontFamily="BMEULJIRO">
                    검색 결과가 없습니다.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </DialogContent>
        <Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
          <OutlinedButton variant="outlined" onClick={handleClose}>
            돌아가기
          </OutlinedButton>
        </Box>
      </Dialog>

      <button
        style={{ cursor: "pointer", width: "150px", paddingRight: 0 }}
        onClick={() => setOpen(true)}
        className="feed-user-search"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          갓생러 검색
          <SearchIcon />
        </Stack>
      </button>
    </>
  );
};

export default BingoFeedAllUserSearch;
