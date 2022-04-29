import EditIcon from "@mui/icons-material/Edit";
import { InputAdornment, TextField } from "@mui/material";

import React from "react";

const BingoTitle = ({
  title,
  setTitle,
}: {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextField
      variant="standard"
      placeholder="오늘의 갓생 제목"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <EditIcon />
          </InputAdornment>
        ),
        style: { fontSize: "18px" },
      }}
      inputProps={{ maxLength: 10 }}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      sx={{
        width: "100%",
        maxWidth: "500px",
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
      }}
    />
  );
};

export default BingoTitle;
