package com.ovcors.godlife.api.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@RequiredArgsConstructor
public class DuplicatedEmailReqDto {
    @NotNull
    String email;

    @Builder
    DuplicatedEmailReqDto(String email) {
        this.email=email;
    }
}
