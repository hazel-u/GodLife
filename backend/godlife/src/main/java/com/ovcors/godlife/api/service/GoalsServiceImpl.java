package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.GoalsReqDto;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.request.UserGoalsReqDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.goals.UserGoals;
import com.ovcors.godlife.core.domain.user.JoinType;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.BingoGoalsRepository;
import com.ovcors.godlife.core.repository.GoalsRepository;
import com.ovcors.godlife.core.repository.UserGoalsRepository;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Configurable
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
    public void deleteUserGoals(User user, UserGoalsReqDto userGoalsReqDto) {
        userGoalsRepository.deleteById(userGoalsReqDto.getSeq());
    }

    @Override
    public List<UserGoals> getUserGoals(User user) {
        //return null;
        return userGoalsRepository.findbyUserSeq(user.getSeq());
    }

    @Override
    public List<Goals> getGoals() {
        return goalsRepository.findAll();
    }
}
