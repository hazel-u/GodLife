import { FormControl, Stack } from "@mui/material";
import axios from "axios";

import { SubmitHandler, useForm } from "react-hook-form";

import { OutlinedButton } from "../../components/common/Button";
import { useLogin } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { LoginInput } from "../../types/user";
import axiosWithToken from "../../utils/axios";
import EmailController from "./EmailController";
import PasswordController from "./PasswordController";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const login = useLogin();

  const { handleSubmit, control } = useForm<LoginInput>();
  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    if (data.email === "deleteEmail@delete.com") {
      dispatch(
        setSnackbar({
          open: true,
          message: "이메일 또는 비밀번호를 확인해주세요.",
          severity: "error",
        })
      );
      return;
    }
    await axios
      .post("user/login", data)
      .then((res) => {
        Promise.resolve()
          .then(() => {
            axiosWithToken.defaults.headers.common["Authorization"] =
              res.headers["authorization"];
            localStorage.setItem("token", res.headers["authorization"]);
            localStorage.setItem("refreshtoken", res.headers["refreshtoken"]);
            localStorage.setItem(
              "expired",
              `${new Date().getTime() + 60000 * 5}`
            );
          })
          .then(() => {
            login();
          });
      })
      .catch(() => {
        dispatch(
          setSnackbar({
            open: true,
            message: "이메일 또는 비밀번호를 확인해주세요.",
            severity: "error",
          })
        );
      });
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
          <OutlinedButton variant="outlined" type="submit">
            갓생살러 가기
          </OutlinedButton>
        </Stack>
      </FormControl>
    </form>
  );
};

export default LoginForm;
