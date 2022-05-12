import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  List,
  ListItem,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import React, { useState } from "react";

import { TextButton } from "../../../components/common/Button";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BingoDetailCopy = ({ code }: { code: string }) => {
  const copyBingoCode = () => {
    navigator.clipboard.writeText(`${code}`);
    setOpen(true);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>갓생 코드 사용법</DialogTitle>
        <DialogContent>
          <DialogContentText>
            갓생 코드가 클립보드에 복사되었습니다. <br /> 다음 방법을 통해
            보시는 갓생과 똑같은 갓생을 만드실 수 있습니다.
            <List>
              <ListItem>
                <Typography fontFamily={"BMEULJIRO"} marginRight={1}>
                  1
                </Typography>
                <Link href="/create" underline="none">
                  갓생 만들기
                </Link>
                로 이동
              </ListItem>
              <ListItem>
                <Typography fontFamily={"BMEULJIRO"} marginRight={1}>
                  2
                </Typography>
                <Typography
                  marginRight={0.5}
                  sx={{
                    borderColor: "#939393",
                    color: "#6D6D6D",
                    border: "1px solid rgb(147, 147, 147)",
                    borderRadius: "10px",
                    padding: "5px 10px",
                  }}
                >
                  복사하기
                </Typography>{" "}
                버튼을 클릭
              </ListItem>
              <ListItem>
                <Typography fontFamily={"BMEULJIRO"} marginRight={1}>
                  3
                </Typography>
                복사된 코드 붙여넣기
              </ListItem>
              <ListItem>
                <Typography fontFamily={"BMEULJIRO"} marginRight={1}>
                  4
                </Typography>
                갓생 복사 완료!
              </ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <TextButton onClick={() => setOpen(false)} autoFocus>
            확인
          </TextButton>
        </DialogActions>
      </Dialog>
      <TextButton onClick={copyBingoCode}>복사하기</TextButton>
    </>
  );
};

export default BingoDetailCopy;
