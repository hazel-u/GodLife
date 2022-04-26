import EditIcon from "@mui/icons-material/Edit";
import { InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";


const BingoTitle = () => {
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


  return (
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
  )
}

export default BingoTitle