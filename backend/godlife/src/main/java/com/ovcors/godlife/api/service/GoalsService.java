package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.GoalsReqDto;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.request.UserGoalsReqDto;
import com.ovcors.godlife.api.dto.response.GoalsResDto;
import com.ovcors.godlife.api.dto.response.UserGoalsResDto;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.goals.UserGoals;
import com.ovcors.godlife.core.domain.user.User;

import java.util.List;

public interface GoalsService {
    void addUserGoals(User user, GoalsReqDto goalsReqDto);
    void deleteUserGoals( UserGoalsReqDto userGoalsReqDto);
    UserGoalsResDto getUserGoals(User user);
    GoalsResDto getGoals();
}
