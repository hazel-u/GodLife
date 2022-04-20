package com.ovcors.godlife.core.domain.goals;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.Comment;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class BingoGoals {

    @Id
    @GeneratedValue
    private Long seq;
    private boolean completed;

    @OneToOne
    @JoinColumn(name = "goals_seq")
    private Goals goals;

    public BingoGoals(){
        this.completed = false;
    }

}
