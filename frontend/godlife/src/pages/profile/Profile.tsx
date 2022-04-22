import {
  Box,
  Dialog,
  Divider,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";

import { OutlinedButton } from "../../components/common/Button";
import ProfileChangePassword from "./ProfileChangePassword";
import ProfileEdit from "./ProfileEdit";
import ProfileTab from "./ProfileTab";

const Profile = () => {
  const [tab, setTab] = useState("info");
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    console.log("dialog close");
    setOpen(false);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: { minWidth: "60%" },
      }}
      sx={{ fontFamily: "Noto Sans KR" }}
      fullScreen={fullScreen}
    >
      <ProfileTab tab={tab} setTab={setTab} />
      <Divider />
      <Stack
        direction="column"
        alignItems="center"
        sx={{ height: "100%", minHeight: "500px", padding: "20px" }}
      >
        {tab === "info" && <ProfileEdit />}
        {tab === "password" && <ProfileChangePassword />}
      </Stack>
      <Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
        <OutlinedButton variant="outlined" onClick={handleClose}>
          돌아가기
        </OutlinedButton>
      </Box>
    </Dialog>
  );
};

export default Profile;
