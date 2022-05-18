package com.ovcors.godlife.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendGoalsResDto {
    private Long goals_seq;
    private Long count;
    private String content;
}
