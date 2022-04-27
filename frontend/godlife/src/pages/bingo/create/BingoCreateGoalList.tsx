import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

import { selectGoal } from "../../../store/goal";
import { useAppSelector } from "../../../store/hooks";
import Goal from "./Goal";

const BingoCreateGoalList = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [goalList, setGoalList] = useState<any[]>([]);
  const [allGoalList, setAllGoalList] = useState<any[]>([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const getGoals = () => {
    axios
      .get("goal")
      .then((res) => {
        setGoalList(res.data.goals);
        setAllGoalList(res.data.goals);
      })
      .catch((err) => console.log(err));
  };

  const getFavorites = () => {
    axios({
      method: "get",
      url: "goal/usergoal",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setUserFavorites(res.data.userGoals);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    getGoals();
  }, []);

  const category = [
    "전체",
    "즐겨찾기",
    "건강한삶",
    "미라클모닝",
    "자기개발",
    "삶의질",
    "습관개선",
    "환경",
  ];

  const selectedGoals = useAppSelector(selectGoal);

  const changeCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectedCategory = (e.target as HTMLLIElement).textContent;

    if (selectedCategory === "전체") {
      setIsActive(false);
      setSelectedCategory(selectedCategory);
      setGoalList(allGoalList);
    } else if (selectedCategory === "즐겨찾기") {
      setIsActive(true);
      setSelectedCategory(selectedCategory);
      setGoalList(userFavorites);
    } else if (selectedCategory !== null && selectedCategory !== "전체") {
      setIsActive(false);
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

  return (
    <>
      <Box
        sx={(theme) => ({
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(8, 100px)",
          columnGap: "10px",
          justifyContent: "center",
          [theme.breakpoints.down(980)]: {
            gridTemplateColumns: "repeat(4, 100px)",
          },
          [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "repeat(2, 100px)",
          },
          margin: "20px 0 10px 0",
        })}
      >
        {category.map((c, index) => (
          <Chip
            key={index}
            label={c}
            sx={{
              width: "100px",
              height: "30px",
              fontSize: "16px",
              "& span": {
                padding: 0,
              },
              marginBottom: "10px",
              border: "1px solid #6D6D6D",
              color: selectedCategory === c ? "black" : "#6D6D6D",
              backgroundColor: selectedCategory === c ? "#D8D8D8" : "white",
            }}
            onClick={(e) => changeCategory(e)}
          />
        ))}
      </Box>
      <Box sx={{ padding: "50px 10px" }}>
        {isActive ? (
          <>
            <Grid container spacing={2}>
              {goalList.map(
                (goal: {
                  seq: string;
                  goals: { seq: number; content: string; category: string };
                }) => (
                  <Grid item xs={3} key={goal.seq}>
                    <Goal {...goal.goals} />
                  </Grid>
                )
              )}
            </Grid>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              {goalList.map(
                (goal: { seq: number; content: string; category: string }) => (
                  <Grid item xs={3} key={goal.seq}>
                    <Goal {...goal} />
                  </Grid>
                )
              )}
            </Grid>
          </>
        )}
      </Box>

      <Grid container spacing={2} py={3} justifyContent="center">
        {goalList.length ? (
          <>
            {goalList.map(
              (goal: { seq: number; content: string; category: string }) => (
                <Grid item key={goal.seq}>
                  <Goal {...goal} />
                </Grid>
              )
            )}
          </>
        ) : (
          <Typography sx={{ textAlign: "center" }}>
            즐겨찾는 목표가 없습니다. <br /> 자주 찾는 목표의 별을 눌러보세요!
          </Typography>
        )}
      </Grid>

      <Stack direction="row" justifyContent="center">
        <p>{selectedGoals.length} / 9 개 선택중</p>
      </Stack>
    </>
  );
};

export default BingoCreateGoalList;
