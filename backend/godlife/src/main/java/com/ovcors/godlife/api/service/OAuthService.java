package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.response.GoogleLoginResDto;

import java.util.Map;

public interface OAuthService {
    GoogleLoginResDto googleLogin(Map<String, Object> map);
}
