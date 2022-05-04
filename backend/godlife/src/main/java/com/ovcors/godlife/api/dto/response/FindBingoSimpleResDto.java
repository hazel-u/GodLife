package com.ovcors.godlife.api.dto.response;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FindBingoSimpleResDto {
    UUID id;
    String code;
    LocalDate startDate;
    Boolean godlife;

    public FindBingoSimpleResDto(Bingo bingo) {
        this.id = bingo.getSeq();
        this.code = bingo.getBingoCode().getCode();
        this.startDate = bingo.getStartDate();
        this.godlife = bingo.getGodlife();
    }
}
