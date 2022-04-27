package com.ovcors.godlife.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class KakaoLoginReqDto {
    private String accessToken;
    private String refreshToken;
}
