import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import React from "react";
import Logo from "../../assets/logo/Godlife/logo.svg";

const Footer = () => {
  return (
    <Container>
      <FooterWrapper>
        <Stack>
          <img src={Logo} alt="logo" style={{ width: "50px", marginBottom: "10px" }} />
          <Box sx={{ fontSize: "12px", margin: "15px 0" }}>
            <span>문의</span>
            <Stack>
              <span>godlife@gmail.com</span>
            </Stack>
            <Stack>
              <span>서울특별시 강남구 테헤란로 212길</span>
            </Stack>
            <Stack>
              <p>CopyRight 2022 갓생살기 All rights reserved.</p>
            </Stack>
          </Box>
        </Stack>
      </FooterWrapper>
    </Container>
  )
}

const Container = styled.footer`
  position: fixed;
  bottom: 0;
  flex-direction: column;
  justifyContent: center;
  alignItems: center;
  width: 100%;
  margin-top: 70px;
  border-top: 1px solid #f1f1f1;
  @media (max-width: 899px) {
    margin-top: 40px;
  }
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 30px;
  padding: 48px 16px;
`;

export default Footer