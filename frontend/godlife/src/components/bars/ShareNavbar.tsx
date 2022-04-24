import styled from "@emotion/styled";

import React from "react";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";

const DivStyle = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  padding: 10px 0px;
  height: 10%;
`;

const ShareNavbar = () => {
  return (
    <DivStyle>
      <Logo width="8%" height="8%" />
    </DivStyle>
  );
};

export default ShareNavbar;
