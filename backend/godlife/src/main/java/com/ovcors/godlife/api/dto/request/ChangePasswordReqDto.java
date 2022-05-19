package com.ovcors.godlife.api.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@RequiredArgsConstructor
public class ChangePasswordReqDto {
    @NotNull
    private String oldPassword;
    @NotNull
    private String newPassword;
    @NotNull
    private String newPasswordCheck;

    @Builder
    ChangePasswordReqDto(String oldPassword, String newPassword, String newPasswordCheck) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.newPasswordCheck = newPasswordCheck;
    }
}
