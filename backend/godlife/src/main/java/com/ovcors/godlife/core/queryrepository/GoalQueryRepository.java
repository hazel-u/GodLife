package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindGoalsResDto;

import java.util.List;

public interface GoalQueryRepository {
    List<FindGoalsResDto> findBasicGoals();
    List<FindGoalsResDto> findCustomGoalsByUserEmail(String userEmail);
}
