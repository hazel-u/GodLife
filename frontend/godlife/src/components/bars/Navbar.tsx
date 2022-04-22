import styled from "@emotion/styled";
import { Box, Grid, Hidden } from "@mui/material";
import React from "react";
import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";
import MobileNavbarDialog from "./MobileNavbarDialog";


const Navbar: React.FC<{ menuName: string }> = ({ menuName }) => {

  return (
    <Container>
      <Hidden mdDown>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 1,
            alignItems: "flex-end",
          }}
        >
          <MenuList>
            <MenuItem>오늘의 갓생</MenuItem>
            <MenuItem>이전의 갓생</MenuItem>
            <MenuItem>내 그룹</MenuItem>
          </MenuList>
          <Logo height="10%"/>
          <MenuList>
            <MenuItem>아이템 샵</MenuItem>
            <MenuItem>내 정보</MenuItem>
            <MenuItem>로그아웃</MenuItem>
          </MenuList>
        </Box>
      </Hidden>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        display={{ md: "none", lg: "none" }}
      >
        <Grid 
          item
          xs  
          sx={{ 
            textAlign: "center", 
            marginTop: 1,
            marginLeft: 1
          }}
        >
          <Logo width="70%" height="70%"/>
        </Grid>
        <Grid
          item
          xs={4}
          sm={6}
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{menuName}</p>
        </Grid>
        <Grid
          item
          xs
          sx={{
            textAlign: "center",
            marginTop: 1,
            marginRight: 1
          }}
        >
          <MobileNavbarDialog />
        </Grid>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  position: "fixed";
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 10%;
`;

const MenuList = styled.ul`
  display: flex;
  text-align: "center";
  list-style: none;
  margin: 0 5%;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 0 20px;
`;

export default Navbar;
