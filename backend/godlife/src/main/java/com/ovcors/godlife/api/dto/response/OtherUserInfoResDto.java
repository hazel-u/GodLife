package com.ovcors.godlife.api.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class OtherUserInfoResDto {
    private String name; // 닉네임
    private String info; // 상태메세지
    private int serialGodCount; // 연속 갓생 일수
    private int godCount; // 총 갓생 일수
    private int followerCount; // 팔로워 수 -> 나를 팔로우하는 사람의 수
    private int followingCount; // 팔로잉 수 -> 내가 팔로잉하는 사람의 수
    private FindBingoResDto todayBingo; // 오늘의 갓생
    private List<FindBingoSimpleResDto> allBingo; // 해당 사용자의 모든 갓생


    @Builder
    public OtherUserInfoResDto(String name, String info, int serialGodCount, int godCount, int followerCount, int followingCount,
                               FindBingoResDto todayBingo, List<FindBingoSimpleResDto> allBingo) {
        this.name = name;
        this.info = info;
        this.serialGodCount = serialGodCount;
        this.godCount = godCount;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
        this.todayBingo = todayBingo;
        this.allBingo = allBingo;
    }
}
