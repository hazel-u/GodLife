import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stack, Button, FormControl } from "@mui/material";
import { LoginInput } from "../../types/user";
import axios from "axios";
import EmailController from "./EmailController";
import PasswordController from "./PasswordController";

const LogIn = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LoginInput>();
  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await axios
      .post("/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.data.token;
        // default header
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        // get User date & dispatch
        localStorage.setItem("token", token);
        // dispatch(setLoggedUser(response.data));
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={0.1}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <FormControl sx={{ width: "100%" }}>
          <EmailController control={control} />
          <PasswordController control={control} />
          <Button type="submit" variant="contained">
            갓생살러 가기
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export default LogIn;
