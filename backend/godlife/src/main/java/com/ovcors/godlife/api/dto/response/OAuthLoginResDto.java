package com.ovcors.godlife.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class OAuthLoginResDto {
    String jwtToken;
    String refreshToken;
    boolean newUser;
}
