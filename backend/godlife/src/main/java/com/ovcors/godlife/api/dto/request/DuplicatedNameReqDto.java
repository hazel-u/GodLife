package com.ovcors.godlife.api.dto.request;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class DuplicatedNameReqDto {
    @NotNull
    String name;

    @Builder
    DuplicatedNameReqDto(String name) {
        this.name=name;
    }
}
