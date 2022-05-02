import { Box, Divider, Stack, Typography } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

import { BlackButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";
import Comment from "./Comment";

const CommentList = ({ getBingo }: { getBingo: () => void }) => {
  const [newComment, setNewComment] = React.useState({
    nickname: "",
    content: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, comments } = useAppSelector(selectBingo);

  const goPreviousBingoList = () => {
    navigate("/list");
  };

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

  return (
    <Box sx={{ maxWidth: "500px", margin: "3% 0", width: "100%" }}>
      <p>댓글 {comments.length}개</p>
      <Divider />
      {!comments.length && (
        <Typography marginY={4}>댓글이 없습니다.</Typography>
      )}
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
            <Comment comment={comment} getBingo={getBingo} />
            {index !== comments.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      <form onSubmit={handleSubmit}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <OutlinedInput
              placeholder="닉네임"
              size="small"
              value={newComment.nickname}
              onChange={(e) => {
                setNewComment({ ...newComment, nickname: e.target.value });
              }}
              sx={{ maxWidth: "150px" }}
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

          <OutlinedInput
            placeholder="내용"
            value={newComment.content}
            sx={{ width: "100%", maxWidth: "500px" }}
            onChange={(e) => {
              setNewComment({ ...newComment, content: e.target.value });
            }}
          />

          <Box sx={{ textAlign: "end" }}>
            <BlackButton
              type="submit"
              sx={{ width: "50px", height: "39.99px" }}
            >
              작성
            </BlackButton>
            <BlackButton
              onClick={goPreviousBingoList}
              sx={{ width: "50px", height: "39.99px" }}
            >
              목록
            </BlackButton>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default CommentList;
