import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import React, { useState } from "react";

import { ReactComponent as StarIcon } from "../../../assets/icon/star.svg";

const BingoCreateComponents = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const category = [
    "전체",
    "건강한삶",
    "미라클모닝",
    "자기개발",
    "삶의 질",
    "습관개선",
    "환경",
  ];

  const changeCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const category = (e.target as HTMLLIElement).textContent;
    if (category) {
      setSelectedCategory(category);
    }
  };

  const BingoTitleInput = styled(TextField)(({ theme }) => ({
    width: "100%",
    "& .MuiInput-root": {
      fontSize: "24px",
      "& fieldset": {
        border: "solid 1px #C4C4C4",
      },
      "&:hover fieldset": {
        border: "solid 1px #C4C4C4",
      },
      "&.Mui-focused fieldset": {
        border: "solid 1px #C4C4C4",
      },
      "&.Mui-disabled fieldset": {
        border: "solid 1px #C4C4C4",
      },
    },
    "& .MuiInput-root:before": {
      borderBottom: "2px solid #B3B3B3",
    },
  }));

  const [click, setClick] = useState(false);
  const [starClick, setStarClick] = useState(false);

  const GoalBox = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "208px",
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
      width: "185px",
      height: "4px",
      background: click ? "#FFEEEE" : "white",
      top: "0px",
      position: "absolute",
    },
  }));

  const GoalButton = styled(Button)(({ theme }) => ({
    position: "relative",
    width: "208px",
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
      width: "185px",
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
      <BingoTitleInput
        variant="standard"
        placeholder="빙고 제목을 입력해주세요!"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EditIcon />
            </InputAdornment>
          ),
        }}
        inputProps={{ maxLength: 25 }}
      />
      {category.map((c, index) => (
        <Chip
          key={index}
          label={c}
          sx={{
            width: "100px",
            height: "30px",
            fontSize: "14px",
            border: "1px solid #6D6D6D",
            color: selectedCategory === c ? "black" : "#6D6D6D",
            backgroundColor: selectedCategory === c ? "#D8D8D8" : "white",
          }}
          onClick={(e) => changeCategory(e)}
        />
      ))}
      <Box sx={{ width: "80%", padding: "30px" }}>
        <GoalBox
          onClick={() => {
            setClick(!click);
          }}
        >
          <BookmarkButton>
            <SvgIcon component={StarIcon} />
          </BookmarkButton>
          <Typography>물 1.5L 이상 마시기</Typography>
        </GoalBox>
      </Box>
      <Box sx={{ width: "80%", padding: "30px" }}>
        <GoalButton
          onClick={() => {
            setClick(!click);
          }}
        >
          <BookmarkButton
            onClick={(e) => {
              e.stopPropagation();
              setStarClick(!starClick);
            }}
          >
            <SvgIcon component={StarIcon} />
          </BookmarkButton>
          <Typography>물 1.5L 이상 마시기</Typography>
        </GoalButton>
      </Box>
    </Box>
  );
};

export default BingoCreateComponents;
