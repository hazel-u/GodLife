import { Box, Dialog, Divider, useMediaQuery, useTheme } from "@mui/material";

import React, { useState } from "react";

import { OutlinedButton } from "../../components/common/Button";
import ProfileChangePassword from "./ProfileChangePassword";
import ProfileDelete from "./ProfileDelete";
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
        style: !fullScreen ? { minWidth: "min(60%, 600px)", width: "60%" } : {},
      }}
      sx={{ fontFamily: "Noto Sans KR" }}
      fullScreen={fullScreen}
    >
      <ProfileTab tab={tab} setTab={setTab} />
      <Divider />
      <Box
        sx={{
          height: "100%",
          minHeight: "500px",
          padding: "20px",
          width: "60%",
          margin: "0 auto",
        }}
      >
        {tab === "info" && <ProfileEdit handleClose={handleClose} />}
        {tab === "password" && (
          <ProfileChangePassword handleClose={handleClose} />
        )}
        {tab === "delete" && <ProfileDelete handleClose={handleClose} />}
      </Box>
      <Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
        <OutlinedButton variant="outlined" onClick={handleClose}>
          돌아가기
        </OutlinedButton>
      </Box>
    </Dialog>
  );
};

export default Profile;
