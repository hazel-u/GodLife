package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.KakaoLoginReqDto;
import com.ovcors.godlife.api.dto.response.OAuthLoginResDto;
import com.ovcors.godlife.api.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/oauth")
@RequiredArgsConstructor
public class OAuthController {

    @Autowired
    OAuthService oAuthService;

    @PostMapping("/google")
    public ResponseEntity<OAuthLoginResDto> googleLogin(@RequestBody Map<String,Object> data) {
        OAuthLoginResDto googleLoginResDto = oAuthService.googleLogin(data);
        return ResponseEntity.ok().body(googleLoginResDto);
    }

    @PostMapping("/kakao")
    public ResponseEntity<OAuthLoginResDto> kakaoLogin(@RequestBody KakaoLoginReqDto kakaoLoginReqDto) {
        OAuthLoginResDto kakaoLoginResDto = oAuthService.kakaoLogin(kakaoLoginReqDto);
        return ResponseEntity.ok().body(kakaoLoginResDto);
    }
}
