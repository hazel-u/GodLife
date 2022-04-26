package com.ovcors.godlife.api.dto.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@RequiredArgsConstructor
public class DeleteCommentDto {
    private String password;
}
