package com.ovcors.godlife.core.domain.bingo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BingoCode {
    @Id @GeneratedValue
    private Long code;

    @OneToOne
    @JoinColumn(name="bingo_seq")
    private Bingo bingo;

    public void setBingo(Bingo bingo) {
        this.bingo = bingo;
    }
}
