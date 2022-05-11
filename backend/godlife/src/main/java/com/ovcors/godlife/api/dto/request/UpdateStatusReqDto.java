package com.ovcors.godlife.api.dto.request;

import lombok.*;

@Data
@RequiredArgsConstructor
public class UpdateStatusReqDto {
    private String info;

    @Builder
    UpdateStatusReqDto(String info) {
        this.info = info;
    }
}
