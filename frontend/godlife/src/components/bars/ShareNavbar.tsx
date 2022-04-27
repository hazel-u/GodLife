import styled from "@emotion/styled";

import React from "react";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";

const DivStyle = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  padding: 10px 10px 40px 10px;
  height: 10%;
`;

const ShareNavbar = () => {
  return (
    <DivStyle>
      <Logo width="100px" height="100px" />
    </DivStyle>
  );
};

export default ShareNavbar;
