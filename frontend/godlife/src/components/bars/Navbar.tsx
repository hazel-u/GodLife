import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";
import MobileNavbarDialog from "./MobileNavbarDialog";

const Navbar: React.FC<{ menuName: string }> = ({ menuName }) => {
  const [isMobile, setIsMobile] = useState<Boolean>(false);

  const Mobile = useMediaQuery({
    query: "(max-width: 991px)",
  });

  useEffect(() => {
    if (Mobile) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [Mobile]);

  return (
    <Container>
      {!isMobile ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            alignItems: "flex-end",
          }}
        >
          <MenuList>
            <MenuItem>오늘의 갓생</MenuItem>
            <MenuItem>이전의 갓생</MenuItem>
            <MenuItem>내 그룹</MenuItem>
          </MenuList>
          <Logo />
          <MenuList>
            <MenuItem>아이템 샵</MenuItem>
            <MenuItem>내 정보</MenuItem>
            <MenuItem>로그아웃</MenuItem>
          </MenuList>
        </Box>
      ) : (
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs sx={{ textAlign: "center", marginTop: 1 }}>
            <Logo />
          </Grid>
          <Grid
            item
            xs={5}
            sm={8}
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
            }}
          >
            <MobileNavbarDialog />
          </Grid>
        </Grid>
      )}
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
