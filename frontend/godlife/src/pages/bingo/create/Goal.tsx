import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Box,
  Button,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import React, { useState } from "react";

import Stamp from "../../../assets/images/stamp.webp";
import { deleteGoal, selectGoal, setGoal } from "../../../store/goal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import axiosWithToken from "../../../utils/axios";

const GoalButton = styled(Button)(({ theme }) => ({
  position: "relative",
  width: "208px",
  height: "50px",
  border: "1px solid #5A5A5A",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  webkitBorderRadius: "10px",
  mozBorderRadius: "10px",
  color: "#5A5A5A",
  "& p": {
    fontSize: "14px",
  },
  "&:hover": {
    color: "black",
    backgroundColor: "#ffffff",
  },
}));

interface GoalProps {
  seq: number;
  content: string;
  category: string;
  favoriteSeq?: string;
  isFavorite: boolean;
  getFavorites: () => void;
  userFavorites: {
    seq: number;
    content: string;
    category: string;
    favoriteSeq: string;
  }[];
}

const Goal = (goal: GoalProps) => {
  const BookmarkButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: 8,
    left: 8,
    padding: 0,
    zIndex: 2,
    "& svg": {
      fontSize: 15,
      color: goal.isFavorite ? "#A11803" : "#939393",
    },
  }));

  const dispatch = useAppDispatch();

  const manageFavorites = () => {
    let request;
    const clickedGoal = goal.userFavorites.find((el) => el.seq === goal.seq);
    if (clickedGoal) {
      request = axiosWithToken.delete("goal", {
        data: { seq: clickedGoal.favoriteSeq },
      });
    } else {
      request = axiosWithToken.put("goal", { seq: goal.seq });
    }
    request
      .then(() => {
        goal.getFavorites();
      })
      .catch((err) => console.log(err));
  };

  const nowSelected = useAppSelector(selectGoal);

  const manageSelectedGoals = () => {
    setStampAnimation(true);
    const found = nowSelected.some((el) => el.seq === goal.seq);
    if (nowSelected.length < 9 && !found) {
      dispatch(
        setGoal([
          { seq: goal.seq, content: goal.content, category: goal.category },
        ])
      );
    } else if (nowSelected.length <= 9 && found) {
      dispatch(
        deleteGoal({
          seq: goal.seq,
          content: goal.content,
          category: goal.category,
        })
      );
    } else if (nowSelected.length === 9 && !found) {
      dispatch(
        setSnackbar({
          open: true,
          message: "최대 9개의 목표를 선택하실 수 있습니다.",
          severity: "info",
        })
      );
    }
  };

  const selectedGoals = useAppSelector(selectGoal);
  const isSelected = () => {
    return selectedGoals.find((el) => el.seq === goal.seq);
  };

  const [stampAnimation, setStampAnimation] = useState(false);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ position: "relative" }}
    >
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          zIndex: 2,
          cursor: "pointer",
          top: 1,
          opacity: isSelected() ? "40%" : "0",
          transition: "opacity 0.2s ease",
        }}
        onClick={manageSelectedGoals}
        className={isSelected() && stampAnimation ? "stamp" : ""}
      >
        <img
          src={Stamp}
          alt="stamp"
          style={{ height: "100%", width: "100%" }}
        />
      </Box>

      <BookmarkButton onClick={manageFavorites}>
        <SvgIcon component={BookmarkIcon} />
      </BookmarkButton>
      <GoalButton onClick={manageSelectedGoals}>
        <Typography>{goal.content}</Typography>
      </GoalButton>
    </Stack>
  );
};

export default Goal;
