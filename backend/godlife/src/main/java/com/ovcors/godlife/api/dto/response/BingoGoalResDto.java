package com.ovcors.godlife.api.dto.response;

import com.ovcors.godlife.core.domain.goals.Goals;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BingoGoalResDto {
    Long seq;
    String content;
    Goals.Category category;
    Boolean completed;
}
