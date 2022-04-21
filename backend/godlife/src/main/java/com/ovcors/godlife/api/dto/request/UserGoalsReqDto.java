package com.ovcors.godlife.api.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class GoalsReqDto {
    @NotNull
    private Long seq;
}
