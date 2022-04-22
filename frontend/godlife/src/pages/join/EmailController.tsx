import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormTrigger,
} from "react-hook-form";

import { OutlinedInput } from "../../components/common/Input";
import { JoinInput } from "../../types/user";
import { useIsMount } from "./CustomHook";

interface EmailControllerProps {
  control: Control<JoinInput, any>;
  trigger: UseFormTrigger<JoinInput>;
  getValues: UseFormGetValues<JoinInput>;
}

const EmailController = ({
  control,
  trigger,
  getValues,
}: EmailControllerProps) => {
  const [validatedEmail, setValidatedEmail] = useState(true);

  const checkEmailDuplication = () => {
    const email = getValues().email;
    axios
      .post("user/duplicate-email", null, {
        params: {
          email,
        },
      })
      .then(() => {
        setValidatedEmail(true);
        trigger("email");
      })
      .catch(() => {
        setValidatedEmail(false);
        trigger("email");
      });
  };

  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount) {
      trigger("email");
    }
  }, [isMount, trigger, validatedEmail]);

  return (
    <Controller
      name="email"
      control={control}
      defaultValue=""
      rules={{
        required: {
          value: true,
          message: "이메일을 입력해주세요.",
        },
        pattern: {
          value:
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
          message: "이메일 형식이 올바르지 않습니다.",
        },
        validate: () => {
          if (!validatedEmail) {
            return "이미 가입된 이메일입니다.";
          }
        },
      }}
      render={({ field, fieldState }) => (
        <>
          <OutlinedInput
            {...field}
            placeholder="이메일"
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message ? fieldState.error.message : " "
            }
            onChange={(e) => {
              field.onChange(e);
              checkEmailDuplication();
            }}
          />
        </>
      )}
    />
  );
};

export default EmailController;
