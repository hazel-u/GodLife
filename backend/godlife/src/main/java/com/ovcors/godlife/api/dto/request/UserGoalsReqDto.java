package com.ovcors.godlife.api.dto.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class UserGoalsReqDto {
    @NotNull
    private UUID seq;
}
