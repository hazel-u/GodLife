package com.ovcors.godlife.core.domain.bingo;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {
    @Builder
    public Comment(String nickname, String password, String content) {
        this.nickname = nickname;
        this.password = password;
        this.content = content;
    }

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="bingo_seq")
    private Bingo bingo;

    private String nickname;
    private String password;
    private String content;

    /* Setter 를 대신한 change Methods */
    public void setBingo(Bingo bingo) {
        this.bingo = bingo;
    }
}
