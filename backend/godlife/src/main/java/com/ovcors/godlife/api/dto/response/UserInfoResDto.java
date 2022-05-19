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
    private String joinType;
    private String info;
    private int followerCnt;
    private int followingCnt;


    @Builder
    public UserInfoResDto(String email, String name, LocalDate recentDate, int godCount, String joinType, String info, int followerCnt, int followingCnt) {
        this.email = email;
        this.name = name;
        this.recentDate = recentDate;
        this.godCount = godCount;
        this.joinType = joinType;
        this.info = info;
        this.followerCnt = followerCnt;
        this.followingCnt = followingCnt;
    }
}
