import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";

import React, { useState } from "react";

import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { setLoggedUser } from "../../store/user";
import axiosWithToken from "../../utils/axios";

const ProfileInfoMessage = ({ info }: { info: string }) => {
  const [newInfo, setNewInfo] = useState(info);

  const [clickEdit, setClickEdit] = useState(false);

  const dispatch = useAppDispatch();

  const changeMessage = () => {
    if (clickEdit) {
      axiosWithToken
        .patch("user/info", { info: newInfo })
        .then(() => {
          axiosWithToken.get("user/info").then((res) => {
            dispatch(setLoggedUser(res.data));
          });
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
      setClickEdit((prevState) => !prevState);
    } else {
      setClickEdit((prevState) => !prevState);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          height: "55px",
          "& p": {
            fontSize: "18px",
          },
        }}
      >
        {clickEdit ? (
          <TextField
            variant="standard"
            inputProps={{
              style: {
                textAlign: "center",
              },
            }}
            InputProps={{
              style: {
                maxWidth: "100%",
                fontSize: "18px",
                minWidth: "36px",
              },
            }}
            autoFocus={true}
            sx={{
              "& .MuiInput-root": {
                fontSize: "20px",
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
            value={newInfo}
            onChange={(e) => {
              setNewInfo(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                changeMessage();
              }
            }}
          />
        ) : (
          <Typography
            sx={{
              fontSize: "18px",
            }}
          >
            {info}
          </Typography>
        )}
        <Box>
          <IconButton onClick={changeMessage}>
            <EditIcon />
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};

export default ProfileInfoMessage;
