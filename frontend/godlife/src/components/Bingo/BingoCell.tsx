import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import dayjs from "dayjs";

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Stamp from "../../assets/images/stamp.webp";
import { selectBingo } from "../../store/bingo";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/user";

interface BingoCellProp {
  content: String;
  isCompleted: boolean;
  customClickEvent: () => void;
  index: number;
}

const BingoCell = ({
  content,
  isCompleted,
  customClickEvent,
  index,
}: BingoCellProp) => {
  const { startDate, userEmail } = useAppSelector(selectBingo);
  const { email } = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (
      email === userEmail &&
      dayjs().format("YYYY-M-D") === startDate.join("-")
    ) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = () => {
    customClickEvent();
    setOpen(false);
    setStampAnimation(true);
  };

  const cell = useRef<HTMLDivElement | null>(null);
  const [cellSize, setCellSize] = useState(160);

  const getCellSize = () => {
    cell.current && setCellSize(cell.current.clientWidth);
  };

  useEffect(() => {
    cell.current && setCellSize(cell.current.clientWidth);
    window.addEventListener("resize", getCellSize);
  }, []);

  const location = useLocation();

  const [stampAnimation, setStampAnimation] = useState(false);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{content}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isCompleted
              ? "목표 달성을 취소하시겠습니까?"
              : "목표를 완료하시겠습니까?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleComplete}>확인</Button>
        </DialogActions>
      </Dialog>

      <Grid
        item
        xs={4}
        onClick={handleClickOpen}
        sx={{
          position: "relative",
          cursor:
            location.pathname === "/list" ||
            (email === userEmail &&
              dayjs().format("YYYY-M-D") === startDate.join("-"))
              ? "pointer"
              : "default",
          "&::before": {
            display: "block",
            content: "''",
            paddingBottom: "100%",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            padding: cellSize < 85 ? 1 : 3,
            borderRadius: "10px",
            boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
            border: "1px solid #b3b3b3",
          }}
          ref={cell}
        >
          <img
            src={Stamp}
            alt="stamp"
            style={{
              position: "absolute",
              width: "100%",
              opacity: isCompleted ? "50%" : "0",
              transition: "opacity 0.2s ease",
            }}
            className={isCompleted && stampAnimation ? "stamp" : ""}
          />

          <Typography
            align="center"
            sx={{
              fontSize: cellSize / 10,
              wordBreak: "keep-all",
            }}
          >
            {content}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

export default BingoCell;
