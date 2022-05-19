package com.ovcors.godlife.api.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class LoginReqDto {
    @NotNull
    private String email;
    @NotNull
    private String password;
}
