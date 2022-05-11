import {
  Box,
  Divider,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import React from "react";

import { BlackButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";
import BingoDetailCommentItem from "./BingoDetailCommentItem";

const BingoDetailCommentList = ({ getBingo }: { getBingo: () => void }) => {
  const [newComment, setNewComment] = React.useState({
    nickname: "",
    content: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { id, comments } = useAppSelector(selectBingo);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const { nickname, content, password } = { ...newComment };
    if (nickname && content && password) {
      axiosWithToken
        .post(`bingo/${id}/comment`, newComment)
        .then(() => {
          dispatch(
            setSnackbar({
              open: true,
              message: "댓글이 작성되었습니다.",
              severity: "success",
            })
          );
          setNewComment({
            nickname: "",
            content: "",
            password: "",
          });
          getBingo();
        })
        .catch(() => {
          dispatch(
            setSnackbar({
              open: true,
              message: "다시 시도해주세요.",
              severity: "error",
            })
          );
        });
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: "닉네임과 비밀번호, 내용을 모두 입력해주세요.",
          severity: "warning",
        })
      );
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ maxWidth: "800px", width: "100%" }}>
      <Divider
        sx={{
          height: "3px",
          backgroundColor: "#989898",
          border: "none",
        }}
      />
      <form onSubmit={handleSubmit} style={{ padding: "20px 0" }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <Stack spacing={1} direction={fullScreen ? "row" : "column"}>
              <OutlinedInput
                placeholder="닉네임"
                size="small"
                value={newComment.nickname}
                onChange={(e) => {
                  setNewComment({ ...newComment, nickname: e.target.value });
                }}
                sx={{ maxWidth: "150px" }}
                type="text"
                inputProps={{ maxLength: 8 }}
              />
              <OutlinedInput
                placeholder="비밀번호"
                size="small"
                value={newComment.password}
                type="password"
                onChange={(e) => {
                  setNewComment({ ...newComment, password: e.target.value });
                }}
                sx={{ maxWidth: "150px" }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md>
            <OutlinedInput
              placeholder="내용"
              value={newComment.content}
              sx={{
                width: "100%",
                maxWidth: "800px",
                "& .MuiOutlinedInput-root": { height: "88px" },
              }}
              inputProps={{ maxLength: 255 }}
              onChange={(e) => {
                setNewComment({ ...newComment, content: e.target.value });
              }}
              multiline
              maxRows={3}
            />
          </Grid>

          <Grid item sx={{ textAlign: "end" }} xs={12} md={1}>
            <BlackButton
              type="submit"
              sx={(theme) => ({
                height: "88px",
                minWidth: "",
                whiteSpace: "pre-line",
                maxWidth: "100px",
                [theme.breakpoints.down("md")]: {
                  whiteSpace: "normal",
                  height: "40px",
                },
              })}
            >
              {"댓글\n쓰기"}
            </BlackButton>
          </Grid>
        </Grid>
      </form>

      {comments
        .slice()
        .sort(function (a, b) {
          for (let i = 0; i < a.date.length; i++) {
            if (a.date[i] !== b.date[i]) {
              return a.date[i] - b.date[i];
            }
          }
          return 0;
        })
        .map((comment: any, index: number) => (
          <React.Fragment key={index}>
            <Divider />
            <BingoDetailCommentItem comment={comment} getBingo={getBingo} />
          </React.Fragment>
        ))}
    </Box>
  );
};

export default BingoDetailCommentList;
