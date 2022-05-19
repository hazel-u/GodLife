package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.BingoGoalsCompletedReqDto;
import com.ovcors.godlife.api.dto.request.GoalsReqDto;
import com.ovcors.godlife.api.dto.request.SaveCustomGoalReqDto;
import com.ovcors.godlife.api.dto.request.UserGoalsReqDto;
import com.ovcors.godlife.api.dto.response.FindGoalsResDto;
import com.ovcors.godlife.api.dto.response.RecommendGoalsResDto;
import com.ovcors.godlife.api.dto.response.UserGoalsResDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.goals.BingoGoals;
import com.ovcors.godlife.core.domain.goals.Category;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.goals.UserGoals;
import com.ovcors.godlife.core.domain.user.Personality;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.queryrepository.GoalQueryRepository;
import com.ovcors.godlife.core.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class GoalsServiceImpl implements GoalsService{

    @Autowired
    GoalsRepository goalsRepository;
    @Autowired
    UserGoalsRepository userGoalsRepository;
    @Autowired
    BingoGoalsRepository bingoGoalsRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PersonalityRepository personalityRepository;

    private final GoalQueryRepository goalQueryRepository;

    @Override
    public void addUserGoals(User user, GoalsReqDto goalsReqDto) {
        Goals goal = goalsRepository.findById(goalsReqDto.getSeq())
                .orElseThrow(() -> new CustomException(ErrorCode.GOALS_NOT_FOUND));
        UserGoals userGoals = UserGoals.builder()
                .user(user)
                .goals(goal)
                .build();
        userGoalsRepository.save(userGoals);
    }

    @Override
    public void deleteUserGoals(UserGoalsReqDto userGoalsReqDto) {
        userGoalsRepository.deleteById(UUID.fromString(userGoalsReqDto.getSeq()));
    }

    @Override
    public UserGoalsResDto getUserGoals(User user) {
        UserGoalsResDto response = new UserGoalsResDto(userGoalsRepository.findByUserSeq(user.getSeq()));
        return response;
    }

    @Override
    public List<FindGoalsResDto> getGoals(User user) {
        List<FindGoalsResDto> response = goalQueryRepository.findBasicGoals();
        response.addAll(goalQueryRepository.findCustomGoalsByUserEmail(user.getEmail()));
        return response ;
    }

    @Override
    public void setCompleted(BingoGoalsCompletedReqDto reqDto) {
        BingoGoals bingoGoals = bingoGoalsRepository.findById(UUID.fromString(reqDto.getSeq()))
                .orElseThrow(()->new CustomException(ErrorCode.BINGO_GOALS_NOT_FOUND));
        bingoGoals.changeCompleted(reqDto.getCompleted());
    }

    @Override
    public void saveCustomGoals(User user, SaveCustomGoalReqDto reqDto) {
        Goals goals = Goals.builder()
                .category(Category.내목표)
                .content(reqDto.getContent())
                .deleted(false)
                .user(user)
                .build();
        goalsRepository.save(goals);
    }

    @Override
    public void deleteCustomGoal(User user, Long customGoalSeq){
        Goals goals = goalsRepository.findById(customGoalSeq).orElseThrow(
                ()->new CustomException(ErrorCode.GOALS_NOT_FOUND)
        );
        if(goals.getUser() == null || !goals.getUser().getSeq().equals(user.getSeq()))
            throw new CustomException(ErrorCode.NOT_MATCH_USER);
        goals.deleteCustomGoal();
    }

    @Override
    public List<RecommendGoalsResDto> recommendGoals(UUID seq) {
        User user = userRepository.findById(seq).get();
        if(user==null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        Personality personality = personalityRepository.findByUser(user);
        if(personality==null) {
            throw new CustomException(ErrorCode.PERSONALITY_NOT_FOUNT);
        }

        List<RecommendGoalsResDto> goals = goalQueryRepository.findRecommendGoalsByPersonality(personality.getPersonalityType());
        Collections.sort(goals);
        return goals;
    }
}
