package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.response.GoogleLoginResDto;
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
    public ResponseEntity<GoogleLoginResDto> googleLogin(@RequestBody Map<String,Object> data) {
        GoogleLoginResDto googleLoginResDto = oAuthService.googleLogin(data);
        return ResponseEntity.ok().body(googleLoginResDto);
    }
}
