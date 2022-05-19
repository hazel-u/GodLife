package com.ovcors.godlife.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class GodLifeResDto {
    private LocalDate recentDate;
    private int godCount;

    @Builder
    GodLifeResDto(LocalDate recentDate, int godCount) {
        this.recentDate = recentDate;
        this.godCount = godCount;
    }
}
