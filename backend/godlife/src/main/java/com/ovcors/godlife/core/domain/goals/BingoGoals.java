package com.ovcors.godlife.core.domain.goals;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.Comment;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BingoGoals {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID seq;

    private boolean completed;

    @ManyToOne
    @JoinColumn(name="bingo_seq")
    private Bingo bingo;

    @ManyToOne
    @JoinColumn(name="goals_seq")
    private Goals goals;
    @Builder
    public BingoGoals(Bingo bingo, Goals goals){
        this.bingo = bingo;
        this.goals = goals;
        this.completed = false;
    }


}
