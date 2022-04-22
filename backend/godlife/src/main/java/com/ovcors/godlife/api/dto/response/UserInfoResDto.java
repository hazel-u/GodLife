package com.ovcors.godlife.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserInfoResDto {
    private String email;
    private String name;
    private LocalDate recentDate;
    private int godCount;


    @Builder
    public UserInfoResDto(String email, String name, LocalDate recentDate, int godCount) {
        this.email = email;
        this.name = name;
        this.recentDate = recentDate;
        this.godCount = godCount;
    }
}
