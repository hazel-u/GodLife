package com.ovcors.godlife.core.domain.bingo;

import com.ovcors.godlife.core.domain.goals.BingoGoals;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bingo {

    @Builder
    public Bingo(BingoCode bingoCode, User user, String title, LocalDate startDate, Integer likeCnt, Integer surpriseCnt, Integer heartCnt, Boolean activate, Boolean godlife) {
        this.bingoCode = bingoCode;
        this.user = user;
        this.title = title;
        this.startDate = startDate;
        this.likeCnt = likeCnt;
        this.surpriseCnt = surpriseCnt;
        this.heartCnt = heartCnt;
        this.activate = activate;
        this.godlife = godlife;
    }

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID seq;

    @OneToOne(mappedBy = "bingo", cascade = CascadeType.ALL)
    private BingoCode bingoCode;

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    private String title;
    private LocalDate startDate;
    private Integer likeCnt;
    private Integer surpriseCnt;
    private Integer heartCnt;
    private Boolean activate;
    private Boolean godlife;

    @OneToMany(mappedBy = "bingo", fetch = FetchType.EAGER)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "bingo")
    private List<BingoGoals> bingoGoals = new ArrayList<>();

    public void setBingoCode(BingoCode bingoCode){
        this.bingoCode = bingoCode;
        bingoCode.setBingo(this);
    }
    public void setUser(User user){
        this.user = user;
    }

    public void changeTitle(String title) {
        this.title = title;
    }
    public void changeActivate() {
        this.activate = false;
    }
    public void changeGodlife() {
        this.godlife = true;
    }
    public void changeLike() {
        this.likeCnt++;
    }

    public void addComment(Comment comment) {
        this.comments.add(comment);
        comment.setBingo(this);
    }
    public void addGoal(BingoGoals goal){
        this.bingoGoals.add(goal);
        goal.setBingo(this);
    }
}
