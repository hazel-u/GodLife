package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.BingoGoalsCompletedReqDto;
import com.ovcors.godlife.api.dto.request.GoalsReqDto;
import com.ovcors.godlife.api.dto.request.UserGoalsReqDto;
import com.ovcors.godlife.api.dto.response.GoalsResDto;
import com.ovcors.godlife.api.dto.response.UserGoalsResDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.goals.BingoGoals;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.goals.UserGoals;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.BingoGoalsRepository;
import com.ovcors.godlife.core.repository.GoalsRepository;
import com.ovcors.godlife.core.repository.UserGoalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class GoalsServiceImpl implements GoalsService{

    @Autowired
    GoalsRepository goalsRepository;
    @Autowired
    UserGoalsRepository userGoalsRepository;
    @Autowired
    BingoGoalsRepository bingoGoalsRepository;

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
        System.out.println(user.getEmail());
        System.out.println(user.getSeq());
        UserGoalsResDto response = new UserGoalsResDto(userGoalsRepository.findByUserSeq(user.getSeq()));
        return response;
//        return null;
    }

    @Override
    public GoalsResDto getGoals() {
        GoalsResDto response = new GoalsResDto(goalsRepository.findAll());
        return response ;
    }

    @Override
    public void setCompleted(BingoGoalsCompletedReqDto reqDto) {
        BingoGoals bingoGoals = bingoGoalsRepository.findById(UUID.fromString(reqDto.getSeq()))
                .orElseThrow(()->new CustomException(ErrorCode.BINGO_GOALS_NOT_FOUND));
        bingoGoals.setCompleted(reqDto.getCompleted());
    }

}
