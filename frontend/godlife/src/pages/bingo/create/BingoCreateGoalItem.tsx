import BookmarkIcon from "@mui/icons-material/Bookmark";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import React, { useState } from "react";
import ReactGA from "react-ga4";

import Stamp from "../../../assets/images/stamp.webp";
import { GoalButton } from "../../../components/common/Button";
import { deleteGoal, selectGoal, setGoal } from "../../../store/goal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSnackbar } from "../../../store/snackbar";
import { FavoriteGoalType, GoalType } from "../../../types/goal";
import axiosWithToken from "../../../utils/axios";

const CustomIconButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  padding: 0,
  zIndex: 2,
  "& svg": {
    fontSize: 15,
  },
});

interface GoalProps extends GoalType {
  favoriteSeq?: string;
  isFavorite: boolean;
  getFavorites: () => void;
  getGoals: () => void;
  userFavorites: FavoriteGoalType[];
}

const BingoCreateGoalItem = (props: GoalProps) => {
  const dispatch = useAppDispatch();

  const selectedGoals = useAppSelector(selectGoal);
  const isSelected = () => {
    return selectedGoals.find((el) => el.seq === props.seq);
  };

  const manageFavorites = () => {
    let request;
    const clickedGoal = props.userFavorites.find((el) => el.seq === props.seq);
    if (clickedGoal) {
      request = axiosWithToken.delete("goal", {
        data: { seq: clickedGoal.favoriteSeq },
      });
    } else {
      request = axiosWithToken.put("goal", { seq: props.seq });
    }
    request
      .then(() => {
        props.getFavorites();
      })
      .catch((err) => console.log(err));
  };

  const manageSelectedGoals = () => {
    setStampAnimation(true);
    const found = selectedGoals.some((el) => el.seq === props.seq);
    if (selectedGoals.length < 9 && !found) {
      dispatch(
        setGoal([
          { seq: props.seq, content: props.content, category: props.category },
        ])
      );
    } else if (selectedGoals.length <= 9 && found) {
      dispatch(
        deleteGoal({
          seq: props.seq,
          content: props.content,
          category: props.category,
        })
      );
    } else if (selectedGoals.length === 9 && !found) {
      dispatch(
        setSnackbar({
          open: true,
          message: "최대 9개의 목표를 선택하실 수 있습니다.",
          severity: "info",
        })
      );
    }
    ReactGA.gtag("event", "select_content", {
      content_type: props.content,
      item_id: props.seq,
    });
  };

  const deleteCustomGoal = () => {
    axiosWithToken
      .delete(`goal/custom/${props.seq}`)
      .then(() => {
        manageSelectedGoals();
        props.getGoals();
        dispatch(
          setSnackbar({
            open: true,
            message: "목표가 삭제되었습니다.",
            severity: "success",
          })
        );
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

      <CustomIconButton
        sx={{
          left: 8,
          "& svg": {
            color: props.isFavorite ? "#A11803" : "#939393",
          },
        }}
        onClick={manageFavorites}
      >
        <SvgIcon component={BookmarkIcon} />
      </CustomIconButton>

      <GoalButton onClick={manageSelectedGoals}>
        <Typography>{props.content}</Typography>
      </GoalButton>

      {props.category === "내목표" && (
        <CustomIconButton
          sx={{
            right: 8,
          }}
          onClick={deleteCustomGoal}
        >
          <SvgIcon component={ClearIcon} />
        </CustomIconButton>
      )}
    </Stack>
  );
};

export default BingoCreateGoalItem;
