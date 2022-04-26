import { Box, Button, Chip, Grid, IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

import React, { useEffect, useState } from "react";

import { selectGoal } from "../../../store/goal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import BingoTitle from "./BingoTitle";
import Goal from "./Goal";

const BingoCreateGoalList = () => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [goalList, setGoalList] = useState<any[]>([]);
  const [allGoalList, setAllGoalList] = useState<any[]>([]);

  const getGoals = () => {
    axios
      .get("goal")
      .then((res) => {
        setGoalList(res.data.goals);
        setAllGoalList(res.data.goals);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGoals();
  }, []);

  const category = [
    "전체",
    "건강한삶",
    "미라클모닝",
    "자기개발",
    "삶의질",
    "습관개선",
    "환경",
    "즐겨찾기",
  ];

  const selectedGoals = useAppSelector(selectGoal);
  const [favorites, setFavorites] = useState<any[]>([]);

  const changeCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectedCategory = (e.target as HTMLLIElement).textContent;

    if (selectedCategory === "전체") {
      setSelectedCategory(selectedCategory);
      setGoalList(allGoalList);
    } else if (selectedCategory === "즐겨찾기") {
      setSelectedCategory(selectedCategory);
      setGoalList(favorites);
    } else if (selectedCategory !== null && selectedCategory !== "즐겨찾기") {
      setSelectedCategory(selectedCategory);
      changeCategoryGoalList(selectedCategory);
    }
  };

  const changeCategoryGoalList = (selectedCategory: string) => {
    const classifiedGoalList = allGoalList.filter(
      (goal) => goal.category === selectedCategory
    );
    setGoalList(classifiedGoalList);
  };

  const manageFavorites = (e: any) => {
    console.log(e);
    const favoritesList: Array<any> = [];
    setFavorites([...favoritesList, e]);
    setStarClick(!starClick);
  };

  const [click, setClick] = useState(false);
  const [starClick, setStarClick] = useState(false);

  const GoalBox = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "24%",
    height: "50px",
    outline: "2px solid #5A5A5A",
    outlineOffset: "-2px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: click ? "#FFEEEE" : "white",
    "&::before": {
      content: "''",
      width: "70%",
      height: "4px",
      background: click ? "#FFEEEE" : "white",
      top: "0px",
      position: "absolute",
    },
  }));

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
      color: starClick ? "#FFE812" : "white",
    },
  }));

  return (
    <Box sx={{ width: "80%", padding: "30px" }}>
      <BingoTitle />
      <Stack direction="row" justifyContent="center">
        {category.map((c, index) => (
          <Chip
            key={index}
            label={c}
            sx={{
              width: "15%",
              height: "30px",
              marginTop: "20px",
              marginX: "5px",
              fontSize: "14px",
              border: "1px solid #6D6D6D",
              color: selectedCategory === c ? "black" : "#6D6D6D",
              backgroundColor: selectedCategory === c ? "#D8D8D8" : "white",
            }}
            onClick={(e) => changeCategory(e)}
          />
        ))}
      </Stack>
      <Box sx={{ padding: "50px 10px" }}>
        <Grid container spacing={2}>
          {goalList.map(
            (goal: { seq: number; content: string; category: string }) => (
              <Grid item xs={3} key={goal.seq}>
                <Goal {...goal} />
              </Grid>
            )
          )}
        </Grid>
      </Box>
      <Stack direction="row" justifyContent="center">
        <p>{selectedGoals.length} / 9 개 선택중</p>
      </Stack>
    </Box>
  );
};

export default BingoCreateGoalList;
