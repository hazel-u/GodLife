import { Button, IconButton, SvgIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import React, { useState } from "react";

import { ReactComponent as StarIcon } from "../../../assets/icon/star.svg";
import { deleteGoal, selectGoal, setGoal } from "../../../store/goal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface GoalProps {
  seq: number;
  content: string;
  category: string;
}

const Goal = (goal: GoalProps) => {
  const dispatch = useAppDispatch();
  // const [selectedGoals, setSelectedGoals] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [click, setClick] = useState(false);

  // const manageFavorites = () => {
  //   if (isFavorite) {
  //     axios
  //     .put(
  //       "goal",
  //       {seq: seq},
  //       {
  //         headers: {
  //           Authorization: `${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then(() => console.log('즐겨찾기 추가'))
  //     .catch((err) => console.log(err));
  //   }
  // };

  const nowSelected = useAppSelector(selectGoal);

  const manageSelectedGoals = () => {
    const found = nowSelected.some((el) => el.seq === goal.seq);
    if (nowSelected.length < 9 && !found) {
      dispatch(setGoal([goal]));
      setClick(true);
    } else if (nowSelected.length < 9 && found) {
      dispatch(deleteGoal(goal));
      setClick(false);
    }
  };

  const GoalButton = styled(Button)(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: "50px",
    outline: "2px solid #5A5A5A",
    outlineOffset: "-2px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    color: "#5A5A5A",
    backgroundColor: click ? "#FFEEEE" : "white",
    "&:before": {
      content: "''",
      width: "70%",
      height: "4px",
      background: click ? "#FFEEEE" : "white",
      top: "0px",
      position: "absolute",
      transition: "all 0.3s",
    },
    "&:hover": {
      color: "black",
      backgroundColor: "#FFEEEE",
    },
    "&:hover:before": {
      background: "#FFEEEE",
    },
  }));

  const BookmarkButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: 8,
    left: 8,
    padding: 0,
    "& svg": {
      fontSize: 15,
      color: isFavorite ? "#FFE812" : "white",
    },
  }));

  return (
    <GoalButton onClick={manageSelectedGoals}>
      <BookmarkButton>
        <SvgIcon component={StarIcon} />
      </BookmarkButton>
      <Typography>{goal.content}</Typography>
    </GoalButton>
  );
};

export default Goal;
