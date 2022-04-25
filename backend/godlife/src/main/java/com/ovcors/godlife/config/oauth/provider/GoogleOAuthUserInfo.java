package com.ovcors.godlife.config.oauth.provider;

public interface GoogleOAuthUserInfo {
    String getProviderId();

    String getProvider();

    String getEmail();

    String getName();

    String getImage();
}
