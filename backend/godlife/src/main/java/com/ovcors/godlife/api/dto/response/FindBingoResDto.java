package com.ovcors.godlife.api.dto.response;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.Comment;
import com.ovcors.godlife.core.domain.goals.BingoGoals;
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
@AllArgsConstructor
@Builder
public class FindBingoResDto {
    UUID id;
    Long code;
    String title;
    String userEmail;
    String userName;
    Boolean activate;
    Boolean godlife;
    LocalDate startDate;
    Integer likeCnt;
    List<BingoGoalResDto> goals = new ArrayList<>();
    List<CommentResDto> comments = new ArrayList<>();

    public FindBingoResDto(Bingo bingo) {
        this.id = bingo.getSeq();
        this.code = bingo.getBingoCode().getCode();
        this.title = bingo.getTitle();
        this.userEmail = bingo.getUser().getEmail();
        this.userName = bingo.getUser().getName();
        this.activate = bingo.getActivate();
        this.godlife = bingo.getGodlife();
        this.startDate = bingo.getStartDate();
        this.likeCnt = bingo.getLikeCnt();

        List<BingoGoals> bingoGoals = bingo.getBingoGoals();
        for (BingoGoals bingoGoal : bingoGoals) {
            this.goals.add(BingoGoalResDto.builder()
                    .seq(bingoGoal.getSeq())
                    .category(bingoGoal.getGoals().getCategory())
                    .content(bingoGoal.getGoals().getContent())
                    .completed(bingoGoal.isCompleted())
                    .build());
        }

        List<Comment> comments = bingo.getComments();
        for (Comment comment : comments) {
            this.comments.add(CommentResDto.builder()
                    .seq(comment.getSeq())
                    .content(comment.getContent())
                    .nickname(comment.getNickname())
                    .password(comment.getPassword())
                    .date(comment.getDate())
                    .build());
        }
    }
}
