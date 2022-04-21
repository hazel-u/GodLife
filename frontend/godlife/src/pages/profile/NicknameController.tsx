import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField } from "@mui/material";

interface NicknameControllerProps {
  currentNickname: string;
}

const NicknameController = (props: NicknameControllerProps) => {
  const { control, trigger, getValues, handleSubmit } = useForm<{
    nickname: string;
  }>({});
  const [validatedNickname, setValidatedNickname] = useState(false);

  const checkNicknameDuplication = () => {
    const nickname = getValues().nickname;
    axios
      .post("user/duplicate-name", null, {
        params: {
          nickname,
        },
      })
      .then(() => {
        setValidatedNickname(true);
        trigger("nickname");
      })
      .catch(() => {
        setValidatedNickname(false);
        trigger("nickname");
      });
  };

  const onSubmit = (data: { nickname: string }) => {
    axios({
      method: "post",
      url: "user/join",
      data: {
        nickname: data.nickname,
      },
    })
      .then((res) => {
        // navigate("/login");
      })
      .catch((err) => {});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "inline" }}>
      <Controller
        name="nickname"
        control={control}
        defaultValue={props.currentNickname}
        rules={{
          required: {
            value: true,
            message: "닉네임을 입력해주세요.",
          },
          maxLength: {
            value: 8,
            message: "닉네임은 8자 이내로 입력해주세요.",
          },
          validate: () => {
            if (!validatedNickname) {
              return "중복된 닉네임입니다.";
            }
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="닉네임"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message ? fieldState.error.message : " "
            }
            onChange={(e) => {
              field.onChange(e);
              checkNicknameDuplication();
            }}
          />
        )}
      />

      <Button variant="contained" type="submit">
        닉네임 수정
      </Button>
    </form>
  );
};

export default NicknameController;
