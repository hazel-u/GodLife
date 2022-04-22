package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.GoalsReqDto;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.request.UserGoalsReqDto;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.dto.response.GoalsResDto;
import com.ovcors.godlife.api.dto.response.UserGoalsResDto;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.GoalsService;
import com.ovcors.godlife.api.service.UserService;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goal")
@RequiredArgsConstructor
public class GoalsController {

    @Autowired
    private GoalsService goalsService;
    @GetMapping
    public ResponseEntity<GoalsResDto> getGoals() {
        GoalsResDto response = goalsService.getGoals();
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("/usergoal")
    public ResponseEntity<UserGoalsResDto> getUserGoals(@Auth User user) {
        UserGoalsResDto response = goalsService.getUserGoals(user);
        return ResponseEntity.ok().body(response);
    }
    @PutMapping
    public ResponseEntity<BaseResponseEntity> addUserGoals(@Auth User user,@RequestBody GoalsReqDto goalsReqDto) {
       System.out.println(user.getEmail());
        goalsService.addUserGoals(user,goalsReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
    @DeleteMapping
    public ResponseEntity<BaseResponseEntity> deleteUserGoals(@RequestBody UserGoalsReqDto userGoalsReqDto) {
        goalsService.deleteUserGoals(userGoalsReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
}
