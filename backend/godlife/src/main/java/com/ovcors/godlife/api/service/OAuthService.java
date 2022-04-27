package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.KakaoLoginReqDto;
import com.ovcors.godlife.api.dto.response.OAuthLoginResDto;

import java.util.Map;

public interface OAuthService {
    OAuthLoginResDto googleLogin(Map<String, Object> map);
    OAuthLoginResDto kakaoLogin(KakaoLoginReqDto kakaoLoginReqDto);
}
