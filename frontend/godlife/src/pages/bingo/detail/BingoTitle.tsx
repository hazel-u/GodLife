import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

const BingoTitle = ({ id, title }: { id: string; title: string }) => {
  const [newTitle, setNewTitle] = useState(title);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const [clickEdit, setClickEdit] = useState(false);

  const edit = () => {
    if (clickEdit) {
      // axios
      //   .put(
      //     `bingo/${id}`,
      //     { title: newTitle },
      //     {
      //       headers: {
      //         Authorization: `${localStorage.getItem("token")}`,
      //       },
      //     }
      //   )
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
      setClickEdit((prevState) => !prevState);
    } else {
      setClickEdit((prevState) => !prevState);
    }
  };

  const [count, setCount] = useState({ godCount: 100, totalGodCount: 100 });

  useEffect(() => {
    axios
      .get("user/god-life", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setCount({ ...count, godCount: res.data.godCount });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        "& p": {
          fontFamily: "BMEULJIRO",
          textAlign: "center",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "65px" }}
      >
        {clickEdit ? (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              inputProps={{
                maxLength: 25,
                style: {
                  textAlign: "center",
                },
              }}
              InputProps={{
                style: {
                  width: `${newTitle.length * 20}px`,
                  maxWidth: "100%",
                  fontFamily: "BMEULJIRO",
                  fontSize: "36px",
                  minWidth: "20px",
                },
              }}
              autoFocus={true}
              sx={{
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
              }}
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
          </form>
        ) : (
          <Typography sx={{ fontSize: 36, width: `${title.length * 20}px` }}>
            {title}
          </Typography>
        )}
        {id && (
          <Box>
            <IconButton onClick={edit}>
              <EditIcon />
            </IconButton>
          </Box>
        )}
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Typography>
          {count.totalGodCount}일 째 갓생 중 | {count.godCount}일 연속 갓생 중
        </Typography>
      </Box>
    </Box>
  );
};

export default BingoTitle;
