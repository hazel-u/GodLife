package com.ovcors.godlife.config.oauth.provider.kakao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class KakaoOAuthResponse {
    private String id;
    private LocalDateTime connectedAt;
    private Properties properties;
    private KakaoAccount kakao_account;

    public KakaoOAuthResponse(String id, LocalDateTime connectedAt, Properties properties, KakaoAccount kakao_account) {
        this.id = id;
        this.connectedAt = connectedAt;
        this.properties = properties;
        this.kakao_account = kakao_account;
    }

    public String getOAuthNickname() { return this.properties.getNickname(); }
    public String getOAuthProfilePath() { return this.kakao_account.getProfile().getProfile_image_url(); }
    public String getOAuthEmail() { return this.kakao_account.getEmail(); }

    //https://developers.kakao.com/tool/rest-api/open/get/v2-user-me 참고
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    private static class Properties {
        private String nickname;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    private static class KakaoAccount {
        private Profile profile;
        private String email;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    private static class Profile {
        private String nickname;
        private String thumbnail_image_url;
        private String profile_image_url;
    }
}
