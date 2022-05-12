import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";

import { selectGoal } from "../../../store/goal";
import { useAppSelector } from "../../../store/hooks";
import { FavoriteGoalType, GoalType } from "../../../types/goal";
import axiosWithToken from "../../../utils/axios";
import BingoCreateCustomGoal from "./BingoCreateCustomGoal";
import BingoCreateGoalItem from "./BingoCreateGoalItem";

const BingoCreateGoalList = () => {
  const selectedGoals = useAppSelector(selectGoal);
  const [selectedCategory, setSelectedCategory] = useState("내 목표");
  const [goalList, setGoalList] = useState<GoalType[]>([]);
  const [allGoalList, setAllGoalList] = useState<GoalType[]>([]);
  const [userFavorites, setUserFavorites] = useState<FavoriteGoalType[]>([]);

  const changeCategory = useCallback(() => {
    selectedCategory && setSelectedCategory(selectedCategory);
    if (selectedCategory === "내 목표") {
      setGoalList([]);
    } else if (selectedCategory === "즐겨찾기") {
      setGoalList(userFavorites);
    } else if (selectedCategory === "선택된목표") {
      setGoalList(selectedGoals);
    } else if (selectedCategory !== null && selectedCategory !== "내 목표") {
      const classifiedGoalList = allGoalList.filter(
        (goal) => goal.category === selectedCategory
      );
      setGoalList(classifiedGoalList);
    }
  }, [selectedCategory, selectedGoals, userFavorites, allGoalList]);

  useEffect(() => {
    changeCategory();
  }, [changeCategory, selectedCategory]);

  const getGoals = useCallback(() => {
    axios
      .get("goal")
      .then((res) => {
        // if (selectedCategory === "내 목표") {
        //   const classifiedGoalList = res.data.goals.filter(
        //     (goal: { category: string }) => goal.category === "내목표"
        //   );
        //   setGoalList(classifiedGoalList);
        // }
        setAllGoalList(res.data.goals);
      })
      .catch((err) => console.log(err));
  }, []);

  const getFavorites = useCallback(() => {
    axiosWithToken
      .get("goal/usergoal")
      .then((res) => {
        const favoriteGoals: FavoriteGoalType[] = [];
        res.data.userGoals.forEach((goal: { goals: GoalType; seq: string }) => {
          favoriteGoals.push({ ...goal.goals, favoriteSeq: goal.seq });
        });
        setUserFavorites(favoriteGoals);
        if (selectedCategory === "즐겨찾기") {
          setGoalList(favoriteGoals);
        }
      })
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  useEffect(() => {
    getGoals();
    getFavorites();
  }, [getGoals, getFavorites]);

  const category = [
    "내 목표",
    "선택된목표",
    "즐겨찾기",
    "건강한삶",
    "미라클모닝",
    "자기개발",
    "삶의질",
    "습관개선",
    "환경",
  ];

  return (
    <Stack direction="row" spacing={2}>
      <Stack>
        {category.map((c, index) => (
          <Chip
            key={index}
            label={c}
            sx={{
              width: "100px",
              height: "30px",
              fontSize: "14px",
              "& span": {
                padding: 0,
                fontFamily: "NotoSerifKR",
              },
              marginBottom: "10px",
              border: "1px solid #b3b3b3",
              boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
              color: selectedCategory === c ? "#f3f3f3" : "#6D6D6D",
              backgroundColor: selectedCategory === c ? "#464646" : "white",
              "&:hover": {
                backgroundColor: selectedCategory === c ? "#464646" : "white",
                color: selectedCategory === c ? "white" : "#6D6D6D",
              },
            }}
            onClick={(e) =>
              ((e.target as HTMLLIElement).textContent as string) &&
              setSelectedCategory(
                (e.target as HTMLLIElement).textContent as string
              )
            }
          />
        ))}
      </Stack>

      <Box>
        <Grid
          container
          spacing={2}
          sx={(theme) => ({
            width: "672px",
            [theme.breakpoints.down(900)]: {
              width: "448px",
            },
            [theme.breakpoints.down(650)]: {
              width: "224px",
            },
          })}
        >
          {goalList.map(
            (goal: {
              seq: number;
              content: string;
              category: string;
              favoriteSeq?: string;
            }) => (
              <Grid item key={goal.seq}>
                <BingoCreateGoalItem
                  {...goal}
                  isFavorite={userFavorites.some((el) => el.seq === goal.seq)}
                  getFavorites={getFavorites}
                  userFavorites={userFavorites}
                  getGoals={getGoals}
                />
              </Grid>
            )
          )}
          {selectedCategory === "내 목표" && (
            <Grid item>
              <BingoCreateCustomGoal getGoals={getGoals} />
            </Grid>
          )}
          {goalList.length === 0 &&
            (selectedCategory === "즐겨찾기" ||
              selectedCategory === "선택된목표") && (
              <Stack
                sx={{ width: "100%", height: "360px" }}
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  sx={{ textAlign: "center", whiteSpace: "pre-line" }}
                >
                  {selectedCategory === "즐겨찾기"
                    ? "즐겨찾는 목표가 없습니다."
                    : "선택된 목표가 없습니다."}
                </Typography>
              </Stack>
            )}
        </Grid>
      </Box>
    </Stack>
  );
};

export default BingoCreateGoalList;
