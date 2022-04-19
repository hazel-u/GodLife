import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stack, Button, FormControl } from "@mui/material";
import { JoinInput } from "../../types/user";
import EmailController from "./EmailController";
import NicknameController from "./NicknameController";
import PasswordContoller from "./PasswordContoller";
import Logo from "../../assets/images/logo.svg";

const Join = () => {
  const { control, trigger, getValues, handleSubmit, watch } =
    useForm<JoinInput>({});

  const navigate = useNavigate();

  const onSubmit = (data: JoinInput) => {
    axios({
      method: "post",
      url: "user/join",
      data: {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      },
    })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {});
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <img src={Logo} alt="logo" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" alignItems="center" spacing={0.4}>
          <FormControl sx={{ width: "300px" }}>
            <EmailController
              control={control}
              trigger={trigger}
              getValues={getValues}
            />
            <NicknameController
              control={control}
              trigger={trigger}
              getValues={getValues}
            />
            <PasswordContoller control={control} watch={watch} />

            <Button variant="contained" type="submit">
              회원가입
            </Button>
          </FormControl>
        </Stack>
      </form>
    </Stack>
  );
};

export default Join;
