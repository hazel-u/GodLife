package com.ovcors.godlife.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class GoogleLoginResDto {
    String jwtToken;
    String refreshToken;
    boolean newUser;
}
