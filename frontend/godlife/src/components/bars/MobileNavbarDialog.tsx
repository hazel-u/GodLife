import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import { Box, Stack } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import "./bars.css"
import menu from "../../assets/icon/menu.png";
import customStyled from "@emotion/styled";


const MenuIcon = customStyled.img`
	width: 48px;
	height: 48px;
`;

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function SwipeableEdgeDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <MenuIcon src={menu} width="100%" onClick={toggleDrawer(true)}></MenuIcon>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Puller />
          <Stack 
            height="100%"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Stack>
              <h2>갓생러님, 갓생사세요!</h2>
              <div className="division-line" />
            </Stack>
            <Stack sx={{ marginTop: "10px" }}>
              <p>오늘의 갓생</p>
              <p>이전의 갓생</p>
              <p>내 그룹</p>
              <p>아이템샵</p>
              <p>내 정보</p>
              <p>로그아웃</p>
            </Stack>
          </Stack>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
