package com.ovcors.godlife.api.dto.response;

import com.ovcors.godlife.core.domain.bingo.Comment;
import com.ovcors.godlife.core.domain.goals.Goals;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class FindBingoResDto {
    UUID id;
    Long code;
    String title;
    List<Goals> goals = new ArrayList<>();
    String userEmail;
    Boolean activate;
    Boolean godlife;
    LocalDate startDate;
    Integer likeCnt;
    Integer commentCnt;
    List<Comment> comments = new ArrayList<>();

    @Builder
    public FindBingoResDto(UUID id, Long code, String title, List<Goals> goals, String userEmail, Boolean activate, Boolean godlife, LocalDate startDate, Integer likeCnt, List<Comment> comments, Integer commentCnt) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.goals = goals;
        this.userEmail = userEmail;
        this.activate = activate;
        this.godlife = godlife;
        this.startDate = startDate;
        this.likeCnt = likeCnt;
        this.comments = comments;
        this.commentCnt = commentCnt;
    }

    public void addComments(List<Comment> comments) {
        this.comments.addAll(comments);
    }
}
