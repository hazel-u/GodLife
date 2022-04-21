package com.ovcors.godlife.api.dto.response;

import com.ovcors.godlife.core.domain.bingo.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindBingoResDto {
    UUID id;
    Long code;
    String title;
    String userEmail;
    Boolean activate;
    Boolean godlife;
    LocalDate startDate;
    Integer likeCnt;
    Integer commentCnt;
    List<Comment> comments;

    public FindBingoResDto(UUID id, Long code, String title, String userEmail, Boolean activate, Boolean godlife, LocalDate startDate, Integer likeCnt, Integer commentCnt) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.userEmail = userEmail;
        this.activate = activate;
        this.godlife = godlife;
        this.startDate = startDate;
        this.likeCnt = likeCnt;
        this.commentCnt = commentCnt;
    }
}
