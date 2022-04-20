package com.ovcors.godlife.core.domain.bingo;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Comment {
    @Builder
    public Comment(String nickname, String password, String content) {
        this.nickname = nickname;
        this.password = password;
        this.content = content;
    }

    @Id @GeneratedValue
    private Long seq;

    @ManyToOne
    @JoinColumn(name="comment_seq")
    private Bingo bingo;

    private String nickname;
    private String password;
    private String content;

    /* Setter 를 대신한 change Methods */
    public void setBingo(Bingo bingo) {
        this.bingo = bingo;
    }
}
