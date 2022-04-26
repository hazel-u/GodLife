package com.ovcors.godlife.config.oauth.provider.google;

public interface GoogleOAuthUserInfo {
    String getProviderId();

    String getProvider();

    String getEmail();

    String getName();

    String getImage();
}
