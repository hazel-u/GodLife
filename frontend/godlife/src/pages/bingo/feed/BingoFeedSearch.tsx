import { Box, Dialog, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";

import React, { useState } from "react";

import { OutlinedButton } from "../../../components/common/Button";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const BingoFeedSearch = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  // Responsive layout
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Tab
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
      value: index,
    };
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        sx={{
          height: "100%",
          minHeight: "450px",
          padding: "20px",
          margin: "0 auto",
        }}
        {...other}
      >
        {value === index && <>{children}</>}
      </Box>
    );
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{
          style: !fullScreen
            ? { minWidth: "min(60%, 600px)", width: "60%" }
            : {},
        }}
        fullScreen={fullScreen}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="사용자 검색" {...a11yProps(0)} />
            <Tab label="날짜 검색" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {/* <ProfileEdit handleClose={handleClose} /> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <ProfileChangePassword handleClose={handleClose} /> */}
        </TabPanel>

        <Box sx={{ textAlign: "center", paddingBottom: "20px" }}>
          <OutlinedButton variant="outlined" onClick={handleClose}>
            돌아가기
          </OutlinedButton>
        </Box>
      </Dialog>
      {/* <OutlinedButton onClick={() => setOpen(true)}>사용자 검색</OutlinedButton> */}
    </>
  );
};

export default BingoFeedSearch;
