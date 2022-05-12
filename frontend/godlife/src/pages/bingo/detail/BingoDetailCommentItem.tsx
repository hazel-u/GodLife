import ClearIcon from "@mui/icons-material/Clear";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import React, { useEffect, useRef, useState } from "react";

import { OutlinedButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import { selectUser } from "../../../store/user";
import { CommentType } from "../../../types/comment";
import axiosWithToken from "../../../utils/axios";

const Comment = ({
  comment,
  getBingo,
}: {
  comment: CommentType;
  getBingo: () => void;
}) => {
  const { userEmail } = useAppSelector(selectBingo);
  const { email } = useAppSelector(selectUser);
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");

  // 비밀번호 input 수동 autofocus
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const [refVisible, setRefVisible] = useState(false);
  useEffect(() => {
    passwordInput.current && passwordInput.current.focus();
  }, [refVisible]);

  const handleClose = () => {
    setOpen(false);
    setPassword("");
  };

  const dispatch = useAppDispatch();
  const deleteComment = () => {
    let deleteRequest;
    if (userEmail === email) {
      deleteRequest = axiosWithToken.delete(`bingo/comment/${comment.seq}`);
    } else {
      deleteRequest = axiosWithToken.post(`bingo/comment/${comment.seq}`, {
        password,
      });
    }

    deleteRequest
      .then(() => {
        getBingo();
        dispatch(
          setSnackbar({
            open: true,
            message: "댓글이 삭제되었습니다.",
            severity: "success",
          })
        );
        handleClose();
      })
      .catch((err) => {
        let message = "다시 시도해주세요";
        if (err.response.data.code === "WRONG_PASSWORD") {
          message = err.response.data.message;
        }
        dispatch(
          setSnackbar({
            open: true,
            message: message,
            severity: "error",
          })
        );
      });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>댓글 삭제</DialogTitle>
        <DialogContent>
          {userEmail === email ? (
            <DialogContentText>댓글을 삭제하시겠습니까?</DialogContentText>
          ) : (
            <>
              <DialogContentText>비밀번호를 입력해주세요.</DialogContentText>
              <OutlinedInput
                inputRef={(el) => {
                  passwordInput.current = el;
                  setRefVisible(!!el);
                }}
                autoFocus={true}
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <OutlinedButton onClick={handleClose}>취소</OutlinedButton>
          <OutlinedButton onClick={deleteComment}>확인</OutlinedButton>
        </DialogActions>
      </Dialog>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        margin="5px 0 20px 0"
        width="100%"
      >
        <Grid item xs={2}>
          {comment.nickname}
        </Grid>
        <Grid item xs={10}>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography sx={{ wordBreak: "break-all" }}>
                {comment.content}
              </Typography>
              <Typography sx={{ fontSize: "11px", color: "#9b9b9b" }}>
                {dayjs(
                  comment.date.slice(0, 3).join("-") +
                    " " +
                    comment.date.slice(3, 5).join(":")
                ).format("YYYY.MM.DD HH:mm")}
              </Typography>
            </Stack>
            <IconButton onClick={() => setOpen(true)}>
              <ClearIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Comment;
