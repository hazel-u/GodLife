import styled from "@emotion/styled";

import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";

const DivStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  padding: 20px 10px 40px 10px;
  height: 10%;
`;

const ShareNavbar = () => {
  const navigate = useNavigate();
  return (
    <DivStyle>
      <Logo
        width="100px"
        height="100px"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      />
    </DivStyle>
  );
};

export default ShareNavbar;
