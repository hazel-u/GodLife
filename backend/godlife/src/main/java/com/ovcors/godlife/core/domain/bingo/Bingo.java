package com.ovcors.godlife.core.domain.bingo;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bingo {
    @Builder
    public Bingo(String title, LocalDate startDate, Integer like, Integer surprise, Integer heart, Boolean activate, Boolean godlife) {
        this.title = title;
        this.startDate = startDate;
        this.like = like;
        this.surprise = surprise;
        this.heart = heart;
        this.activate = activate;
        this.godlife = godlife;
    }

    @Id @GeneratedValue
    private Long seq;

    private String title;
    private LocalDate startDate;
    private Integer like;
    private Integer surprise;
    private Integer heart;
    private Boolean activate;
    private Boolean godlife;

    @OneToMany(mappedBy = "bingo", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    /* Setter 를 대신한 change Methods */
    public void addComment(Comment comment){
        this.comments.add(comment);
        comment.setBingo(this);
    }
}
