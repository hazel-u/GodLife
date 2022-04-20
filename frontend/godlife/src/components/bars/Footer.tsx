import React from "react";
import styled from "@emotion/styled";
import {
	FacebookShareButton,
	FacebookIcon,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import instagram from "../../assets/icon/instagram.png";
import kakaotalk from "../../assets/icon/kakaotalk.png";


const FlexContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 48px);
	grid-column-gap: 8px;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
`;

const URLShareButton = styled.button`
	width: 48px;
	height: 48px;
	color: white;
	border-radius: 24px;
	border: 0px;
	font-size: 16px;
	cursor: pointer;
	background-color: #7362ff;
	&:hover {
		background-color: #a99fee;
	}
`;

const KakaoShareButton = styled.a`
	cursor: pointer;
`;

const KakaoIcon = styled.img`
	width: 48px;
	height: 48px;
`;

const InstagramShareButton = styled.a`
	cursor: pointer;
`;

const InstagramIcon = styled.img`
	width: 52px;
	height: 52px;
`;



const Footer = () => {
  const currentUrl = window.location.href;
  return (
    <FlexContainer>
      <p>내 갓생 자랑하기</p>
      <GridContainer>
        <KakaoShareButton>
					<KakaoIcon src={kakaotalk}></KakaoIcon>
				</KakaoShareButton>
        <InstagramShareButton>
					<InstagramIcon src={instagram}></InstagramIcon>
				</InstagramShareButton>
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
        </FacebookShareButton>
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
        </TwitterShareButton>
        <CopyToClipboard text={currentUrl}>
					<URLShareButton>URL</URLShareButton>
				</CopyToClipboard>
      </GridContainer>
    </FlexContainer>
  )
}

export default Footer