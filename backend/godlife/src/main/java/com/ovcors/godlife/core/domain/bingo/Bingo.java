package com.ovcors.godlife.core.domain.bingo;

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
    public Bingo(String title, LocalDate startDate, Integer likeCnt, Integer surpriseCnt, Integer heartCnt, Boolean activate, Boolean godlife) {
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

    private String title;
    private LocalDate startDate;
    private Integer likeCnt;
    private Integer surpriseCnt;
    private Integer heartCnt;
    private Boolean activate;
    private Boolean godlife;

    public void setBingoCode(BingoCode bingoCode){
        this.bingoCode = bingoCode;
        bingoCode.setBingo(this);
    }

}
