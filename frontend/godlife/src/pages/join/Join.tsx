import { Stack } from "@mui/material";
import axios from "axios";

import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/logo/Godlife/logo.svg";
import { BlackButton, OutlinedButton } from "../../components/common/Button";
import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { JoinInput } from "../../types/user";
import JoinEmailController from "./JoinEmailController";
import JoinNicknameController from "./JoinNicknameController";
import JoinPasswordContoller from "./JoinPasswordContoller";

const Join = () => {
  useEffect(() => {
    document.title = "회원가입 | 갓생살기";
    return () => {
      document.title = "갓생살기";
    };
  }, []);

  const { control, trigger, getValues, handleSubmit, watch } =
    useForm<JoinInput>({});

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: JoinInput) => {
    axios({
      method: "post",
      url: "user/join",
      data,
    })
      .then((res) => {
        navigate("/login");
        ReactGA.gtag("event", "sign_up", {
          method: "native",
        });
        dispatch(
          setSnackbar({
            open: true,
            message: "회원가입이 완료되었습니다.",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        dispatch(
          setSnackbar({
            open: true,
            message: "다시 시도해주세요.",
            severity: "error",
          })
        );
      });
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <img src={Logo} alt="logo" style={{ width: "120px", margin: "30px" }} />

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Stack direction="column" alignItems="center" spacing={1.5}>
          <JoinEmailController
            control={control}
            trigger={trigger}
            getValues={getValues}
          />
          <JoinNicknameController
            control={control}
            trigger={trigger}
            getValues={getValues}
          />
          <JoinPasswordContoller control={control} watch={watch} />

          <BlackButton type="submit">회원가입</BlackButton>
          <OutlinedButton variant="outlined" href="/login">
            로그인하러 가기
          </OutlinedButton>
        </Stack>
      </form>
    </Stack>
  );
};

export default Join;
