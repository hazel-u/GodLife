package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindGoalsResDto;
import com.ovcors.godlife.api.dto.response.RecommendGoalsResDto;
import com.ovcors.godlife.core.domain.user.PersonalityType;

import java.util.List;

public interface GoalQueryRepository {
    List<FindGoalsResDto> findBasicGoals();
    List<FindGoalsResDto> findCustomGoalsByUserEmail(String userEmail);
    List<RecommendGoalsResDto> findRecommendGoalsByPersonality(PersonalityType personalityType);
}
