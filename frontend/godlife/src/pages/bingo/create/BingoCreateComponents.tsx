import EditIcon from "@mui/icons-material/Edit";
import {
  Box, Button, Chip, Grid, IconButton,
  InputAdornment, Stack, SvgIcon,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { ReactComponent as StarIcon } from "../../../assets/icon/star.svg";
import Goal from "./Goal";


const BingoCreateComponents = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  // const [category, setCategory] = useState([]);

  // const getCategoryList = () => {
  //   axios
  //     .get("goal")
  //     .then((res) => {
  //       console.log(res.data.goals)
  //       setCategory(res.data.goals)
  //     })
  //     .catch((err) => console.log(err))
  // }

  // useEffect(() => {
  //   getCategoryList();
  // }, []);

  const category = [
    "전체",
    "건강한삶",
    "미라클모닝",
    "자기개발",
    "삶의질",
    "습관개선",
    "환경",
    "즐겨찾기"
  ];


  const dummyGoalList = [
    {
      category: "환경",
      content: "환경1",
      seq: 0,
    },
    {
      category: "습관개선",
      content: "습관 개선1",
      seq: 1,
    },
    {
      category: "건강한삶",
      content: "건강한 삶1",
      seq: 2,
    },
    {
      category: "건강한삶",
      content: "건강한 삶2",
      seq: 3,
    },
    {
      category: "건강한삶",
      content: "건강한 삶3",
      seq: 4,
    },
    {
      category: "환경",
      content: "환경2",
      seq: 5,
    },
    {
      category: "자기개발",
      content: "자기개발1",
      seq: 6,
    },
    {
      category: "미라클모닝",
      content: "미라클모닝1",
      seq: 7,
    },
    {
      category: "미라클모닝",
      content: "미라클모닝2",
      seq: 8,
    },
    {
      category: "환경",
      content: "환경3",
      seq: 9,
    },
    {
      category: "삶의질",
      content: "삶의 질1",
      seq: 10,
    },
    {
      category: "삶의질",
      content: "삶의 질2",
      seq: 11,
    },
  ]

  const [goalList, setGoalList] = useState(dummyGoalList);
  const [favorites, setFavorites] = useState<any[]>([]);
  
  const changeCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectedCategory = (e.target as HTMLLIElement).textContent;
    
    if (selectedCategory === '전체') {
      setSelectedCategory(selectedCategory);
      setGoalList(dummyGoalList);
    }
    else if (selectedCategory === '즐겨찾기') {
      setSelectedCategory(selectedCategory);
      setGoalList(favorites);
    }
    else if (selectedCategory !== null && selectedCategory !== '즐겨찾기') {
      setSelectedCategory(selectedCategory);
      changeCategoryGoalList(selectedCategory);
    }
  };

  const changeCategoryGoalList = (selectedCategory: string) => {
    const classifiedGoalList = dummyGoalList.filter(goal => goal.category === selectedCategory);
    setGoalList(classifiedGoalList);
  };

  const manageFavorites = (e: any) => {
    console.log(e);
    const favoritesList: Array<any> = [];
    setFavorites([...favoritesList, e])
    setStarClick(!starClick); 
  }


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
      <Box sx={{ padding: "40px 10px" }}>
        {favorites && favorites.map((goal, index) => (
          <GoalBox
            onClick={() => {
              setClick(!click);
            }}
            >
            <BookmarkButton>
              <SvgIcon 
                component={StarIcon}
              />
            </BookmarkButton>
            <Typography>{goal.content}</Typography>
          </GoalBox>
        ))}
      </Box>
      <Box sx={{ padding: "10px" }}>
        <Grid
          container
          spacing={2}
        >
        {goalList.map((goal, index) => (
          <Grid 
            item 
            xs={3} 
            key={index}
          >
            <Goal 
              seq={goal.seq}
              content={goal.content}
              category={goal.category}
            />
          </Grid>
          ))}
        </Grid>
      </Box>
      <Stack direction="row" justifyContent="center">
        <p>1/9개 선택중</p>
      </Stack>
    </Box>
  );
};

export default BingoCreateComponents;
