package com.ovcors.godlife.core.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum JoinType {
    NATIVE("NATIVE"),
    GOOGLE("GOOGLE"),
    KAKAO("KAKAO"),

    ;

    private final String companyName;
}
