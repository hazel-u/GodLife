package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.*;
import com.ovcors.godlife.api.dto.response.FindGoalsResDto;
import com.ovcors.godlife.api.dto.response.UserGoalsResDto;
import com.ovcors.godlife.core.domain.user.User;

import java.util.List;

public interface GoalsService {
    void addUserGoals(User user, GoalsReqDto goalsReqDto);
    void deleteUserGoals( UserGoalsReqDto userGoalsReqDto);
    UserGoalsResDto getUserGoals(User user);
    List<FindGoalsResDto> getGoals(User user);
    void setCompleted(BingoGoalsCompletedReqDto reqDto);
    void saveCustomGoals(User user, SaveCustomGoalReqDto reqDto);
    void deleteCustomGoal(User user, Long customGoalSeq);
}
