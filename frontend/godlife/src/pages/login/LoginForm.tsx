import { FormControl, Stack } from "@mui/material";
import axios from "axios";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { OutlinedButton } from "../../components/common/Button";
import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { setLoggedUser } from "../../store/user";
import { LoginInput } from "../../types/user";
import EmailController from "./EmailController";
import PasswordController from "./PasswordController";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<LoginInput>();
  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await axios
      .post("/user/login", data)
      .then((res) => {
        localStorage.setItem("refreshtoken", res.headers["refreshtoken"]);
        localStorage.setItem("token", res.headers["authorization"]);
        navigate("/");
        dispatch(
          setSnackbar({
            open: true,
            message: "로그인이 완료되었습니다.",
            severity: "success",
          })
        );

        axios
          .get("user/info", {
            headers: {
              Authorization: res.headers["refreshtoken"],
            },
          })
          .then((res) => {
            dispatch(setLoggedUser(res.data));
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
          <OutlinedButton type="submit" variant="outlined">
            갓생살러 가기
          </OutlinedButton>
        </Stack>
      </FormControl>
    </form>
  );
};

export default LoginForm;
