package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.*;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.dto.response.FindGoalsResDto;
import com.ovcors.godlife.api.dto.response.UserGoalsResDto;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.GoalsService;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goal")
@RequiredArgsConstructor
public class GoalsController {

    private final GoalsService goalsService;

    @GetMapping
    public ResponseEntity<List<FindGoalsResDto>> getGoals(@Auth User user) {
        List<FindGoalsResDto> response = goalsService.getGoals(user);
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("/usergoal")
    public ResponseEntity<UserGoalsResDto> getUserGoals(@Auth User user) {
        UserGoalsResDto response = goalsService.getUserGoals(user);
        return ResponseEntity.ok().body(response);
    }
    @PutMapping
    public ResponseEntity<BaseResponseEntity> addUserGoals(@Auth User user,@RequestBody GoalsReqDto goalsReqDto) {
        goalsService.addUserGoals(user,goalsReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
    @DeleteMapping
    public ResponseEntity<BaseResponseEntity> deleteUserGoals(@RequestBody UserGoalsReqDto userGoalsReqDto) {
        goalsService.deleteUserGoals(userGoalsReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping
    public ResponseEntity<BaseResponseEntity> setBingoGoalsCompleted(@RequestBody BingoGoalsCompletedReqDto reqDto){
        goalsService.setCompleted(reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/custom")
    public ResponseEntity<BaseResponseEntity> createCustomGoal(@Auth User user, @RequestBody SaveCustomGoalReqDto reqDto){
        goalsService.saveCustomGoals(user, reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @DeleteMapping("/custom/{seq}")
    public ResponseEntity<BaseResponseEntity> deleteCustomGoal(@Auth User user, @PathVariable Long seq){
        goalsService.deleteCustomGoal(user, seq);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
}
