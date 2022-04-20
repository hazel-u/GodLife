package com.ovcors.godlife.config.jwt;

public interface JwtProperties {
    int EXPIRATION_TIME = 1000*60*60*24*7*2; // 2주
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";

    // Refresh Token
    int REFRESH_EXPIRATION_TIME = 1000*60*60*24*7*2; // 2주
    String REFRESH_TOKEN_HEADER_STRING = "RefreshToken";
}
