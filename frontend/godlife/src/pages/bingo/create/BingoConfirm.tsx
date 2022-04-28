import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import React from "react";

import { selectGoal } from "../../../store/goal";
import { useAppSelector } from "../../../store/hooks";

const BingoConfirm = ({
  confirmOpen,
  setConfirmOpen,
  startBingo,
}: {
  confirmOpen: boolean;
  setConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startBingo: () => void;
}) => {
  const handleClose = () => {
    setConfirmOpen(false);
    startBingo();
  };

  const selectedGoals = useAppSelector(selectGoal);

  return (
    <Dialog open={confirmOpen} onClose={handleClose}>
      <DialogTitle>갓생 시작하기</DialogTitle>
      <DialogContent>
        <DialogContentText>
          총 {selectedGoals.length}개의 목표를 선택하셨습니다.
        </DialogContentText>
        <List dense={true} sx={{ padding: "30px 0" }}>
          {selectedGoals.map((goal) => (
            <ListItem key={goal.seq}>
              <ListItemText>✔ {goal.content}</ListItemText>
            </ListItem>
          ))}
        </List>
        {selectedGoals.length < 9 && (
          <DialogContentText>
            {9 - selectedGoals.length}개의 목표가 무작위로 선택되어 추가됩니다.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setConfirmOpen(false);
          }}
        >
          취소
        </Button>
        <Button onClick={handleClose}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BingoConfirm;
