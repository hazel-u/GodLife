package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.GoalsReqDto;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.GoalsService;
import com.ovcors.godlife.api.service.UserService;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/goal")
@RequiredArgsConstructor
public class GoalsController {

    @Autowired
    private GoalsService goalsService;
    @GetMapping
    public ResponseEntity<BaseResponseEntity> getGoals(@Auth User user) {
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
    @GetMapping("/usergoal")
    public ResponseEntity<BaseResponseEntity> getUserGoals(@Auth User user) {
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
    @PutMapping
    public ResponseEntity<BaseResponseEntity> addUserGoals(@Auth User user,@RequestBody GoalsReqDto goalsReqDto) {

        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
    @DeleteMapping
    public ResponseEntity<BaseResponseEntity> deleteUserGoals(@Auth User user,@RequestBody GoalsReqDto goalsReqDto) {
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

}
