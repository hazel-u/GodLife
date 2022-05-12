import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import React, { useState } from "react";

import { GoalButton, OutlinedButton } from "../../../components/common/Button";
import { OutlinedInput } from "../../../components/common/Input";
import { useAppDispatch } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";

const BingoCreateCustomGoal = ({ getGoals }: { getGoals: () => void }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const dispatch = useAppDispatch();
  const addGoal = () => {
    content &&
      axiosWithToken
        .post("goal/??")
        .then(() => {
          getGoals();
          handleClose();
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

  const handleClose = () => {
    setOpen(false);
    setContent("");
  };

  return (
    <>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <DialogTitle>목표 만들기</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <p>나만의 새로운 목표를 추가해보세요.</p>
          <OutlinedInput
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            type="text"
            placeholder="목표"
          />
        </DialogContent>

        <DialogActions>
          <OutlinedButton onClick={handleClose}>취소</OutlinedButton>
          <OutlinedButton onClick={addGoal} autoFocus>
            확인
          </OutlinedButton>
        </DialogActions>
      </Dialog>

      <GoalButton onClick={() => setOpen(true)}>
        <AddIcon />
        목표 추가
      </GoalButton>
    </>
  );
};

export default BingoCreateCustomGoal;
