package com.ovcors.godlife.api.dto.request;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ChangeUserInfoReqDto {
    @NotNull
    private String name;

    @Builder
    ChangeUserInfoReqDto(String name) {
        this.name=name;
    }
}
