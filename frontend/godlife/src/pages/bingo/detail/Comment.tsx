import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useRef, useState } from "react";

import { OutlinedButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { selectBingo } from "../../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import { selectUser } from "../../../store/user";
import { CommentType } from "../../../types/comment";

const Comment = ({ comment }: { comment: CommentType }) => {
  const { userEmail } = useAppSelector(selectBingo);
  const { email } = useAppSelector(selectUser);
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  console.log(comment);

  // 비밀번호 input 수동 autofocus
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const [refVisible, setRefVisible] = useState(false);
  useEffect(() => {
    passwordInput.current && passwordInput.current.focus();
  }, [refVisible]);

  const dispatch = useAppDispatch();
  const deleteComment = () => {
    let deleteRequest;
    if (userEmail === email) {
      deleteRequest = axios.delete(`bingo/comment/${comment.seq}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
    } else {
      deleteRequest = axios.post(
        `bingo/comment/${comment.seq}`,
        { password },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
    }

    deleteRequest
      .then(() => {
        dispatch(
          setSnackbar({
            open: true,
            message: "댓글이 삭제되었습니다.",
            severity: "success",
          })
        );
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
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setPassword("");
        }}
      >
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
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <OutlinedButton
            onClick={() => {
              setOpen(false);
              setPassword("");
            }}
          >
            취소
          </OutlinedButton>
          <OutlinedButton onClick={deleteComment}>확인</OutlinedButton>
        </DialogActions>
      </Dialog>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <p>{comment.nickname}</p>
        <Box>
          <IconButton onClick={() => setOpen(true)}>
            <ClearIcon />
          </IconButton>
        </Box>
      </Stack>
      <Typography sx={{ margin: "0 0 30px 0" }}>{comment.content}</Typography>
    </>
  );
};

export default Comment;
