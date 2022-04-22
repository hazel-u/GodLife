import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormTrigger,
} from "react-hook-form";

import { OutlinedInput } from "../../components/common/Input";
import { useIsMount } from "../../hooks/useIsMount";
import { JoinInput } from "../../types/user";

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
    const name = getValues().name;

    axios
      .post("user/duplicate-name", null, {
        params: {
          name,
        },
      })
      .then(() => {
        setValidatedNickname(true);
      })
      .catch(() => {
        setValidatedNickname(false);
      });
  };

  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount) {
      trigger("name");
    }
  }, [validatedNickname, isMount, trigger]);

  return (
    <Controller
      name="name"
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
