package com.ovcors.godlife.api.dto.response;

import com.ovcors.godlife.core.domain.goals.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindGoalsResDto {
    Long seq;
    String content;
    Category category;
}
