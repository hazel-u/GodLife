package com.ovcors.godlife.api.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;

@Data
@RequiredArgsConstructor
public class JoinReqDto {
    @NotNull
    String email;
    @NotNull
    String password;
    @NotNull
    String name;

    @Builder
    public JoinReqDto(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}
