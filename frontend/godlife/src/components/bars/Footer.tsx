import styled from "@emotion/styled";
import { Stack } from "@mui/material";

import React from "react";

import WallImage from "../../assets/images/wall.webp";
import Logo from "../../assets/logo/Godlife/logo.svg";

const Footer = () => {
  return (
    <Container>
      <FooterWrapper>
        <Stack sx={{ fontSize: "14px" }}>
          <img
            src={WallImage}
            alt="wall"
            height={"60px"}
            width={"100%"}
            style={{ objectFit: "cover" }}
          />
          <img
            src={Logo}
            alt="logo"
            style={{ width: "50px", height: "50px", margin: "20px 0" }}
          />
          <span>문의</span>
          <a
            style={{ textDecoration: "none", color: "black" }}
            href="mailto:today.godlife@gmail.com?subject=갓생살기"
          >
            today.godlife@gmail.com
          </a>
          <span>서울특별시 강남구 테헤란로 212길</span>

          <p>CopyRight 2022 갓생살기 All rights reserved.</p>
        </Stack>
      </FooterWrapper>
    </Container>
  );
};

const Container = styled.footer`
  flex-direction: column;
  justifycontent: center;
  alignitems: center;
  width: 100%;
  height: 25%;
  margin-top: 70px;
  @media (max-width: 899px) {
    margin-top: 40px;
  }
`;

const FooterWrapper = styled.div`
  margin: 0 10px;
  padding: 48px 16px;
`;

export default Footer;
