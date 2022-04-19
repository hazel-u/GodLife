package com.ovcors.godlife.api.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class JoinReqDto {
    @NotNull
    String email;
    @NotNull
    String password;
    @NotNull
    String name;
}
