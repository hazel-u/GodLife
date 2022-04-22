import React from "react";
import { ReactComponent as Logo }  from "../../assets/logo/logo.svg";
import styled from "@emotion/styled";


const DivStyle = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  padding: 10px 0px;
  height: 10%;
  position: sticky;
  top: 0;
`;


const ShareNavbar = () => {
  return (
    <DivStyle>
      <Logo width="8%" height="8%"/>
    </DivStyle>
  )
}

export default ShareNavbar