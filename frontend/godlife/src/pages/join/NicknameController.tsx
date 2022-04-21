import React, { useState, useEffect } from "react";
import {
  Controller,
  Control,
  UseFormGetValues,
  UseFormTrigger,
} from "react-hook-form";
import axios from "axios";
import { OutlinedInput } from "../../components/common/Input";
import { JoinInput } from "../../types/user";
import { useIsMount } from "./CustomHook";

interface NicknameControllerProps {
  control: Control<JoinInput, any>;
  trigger: UseFormTrigger<JoinInput>;
  getValues: UseFormGetValues<JoinInput>;
}

const NicknameController = ({
  control,
  trigger,
  getValues,
}: NicknameControllerProps) => {
  const [validatedNickname, setValidatedNickname] = useState(true);

  const checkNicknameDuplication = () => {
    const nickname = getValues().nickname;

    // axios
    //   .post("user/duplicate-name", null, {
    //     params: {
    //       nickname,
    //     },
    //   })
    //   .then(() => {
    //     setValidatedNickname(true);
    //     trigger("nickname");
    //   })
    //   .catch(() => {
    //     setValidatedNickname(false);
    //     trigger("nickname");
    //   });
  };

  // const isMount = useIsMount();
  // useEffect(() => {
  //   if (!isMount) {
  //     trigger("email");
  //   }
  // }, [validatedNickname, isMount, trigger]);

  return (
    <Controller
      name="nickname"
      control={control}
      defaultValue=""
      rules={{
        required: {
          value: true,
          message: "닉네임을 입력해주세요.",
        },
        maxLength: {
          value: 8,
          message: "닉네임은 8자 이내로 입력해주세요.",
        },
        pattern: {
          value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
          message: "영문, 한글, 숫자만 입력해주세요.",
        },
        validate: () => {
          if (!validatedNickname) {
            return "중복된 닉네임입니다.";
          }
        },
      }}
      render={({ field, fieldState }) => (
        <OutlinedInput
          {...field}
          placeholder="닉네임"
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
  );
};

export default NicknameController;
