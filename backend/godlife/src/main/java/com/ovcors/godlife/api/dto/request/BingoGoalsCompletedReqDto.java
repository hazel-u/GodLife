package com.ovcors.godlife.api.dto.request;

import com.ovcors.godlife.core.domain.bingo.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BingoGoalsCompletedReqDto {
    @NotNull
    String seq;
    @NotNull
    Boolean completed;

}
