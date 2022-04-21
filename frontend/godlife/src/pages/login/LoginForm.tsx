import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Stack, Button, FormControl } from "@mui/material";
import { LoginInput } from "../../types/user";
import axios from "axios";
import EmailController from "./EmailController";
import PasswordController from "./PasswordController";
import { OutlinedButton } from "../../components/common/Button";

const LoginForm = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LoginInput>();
  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await axios
      .post("/user/login", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("refreshtoken", res.headers["refreshtoken"]);
        localStorage.setItem("token", res.headers["authorization"]);

        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={{ width: "100%" }}>
        <Stack
          spacing={1.5}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <EmailController control={control} />
          <PasswordController control={control} />
          <OutlinedButton type="submit" variant="outlined">
            갓생살러 가기
          </OutlinedButton>
        </Stack>
      </FormControl>
    </form>
  );
};

export default LoginForm;
