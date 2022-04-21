import React from "react";
import { styled } from "@mui/material/styles";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: "100%",
  "& .MuiToggleButtonGroup-grouped": {
    width: "50%",
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

interface Tab {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileTab = (props: Tab) => {
  const handleTab = (event: React.MouseEvent<HTMLElement>, newTab: string) => {
    props.setTab(newTab);
  };

  return (
    <StyledToggleButtonGroup value={props.tab} exclusive onChange={handleTab}>
      <ToggleButton value="info">회원정보 수정</ToggleButton>
      <ToggleButton value="password">비밀번호 변경</ToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default ProfileTab;
