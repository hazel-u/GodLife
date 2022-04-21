package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.UserService;
import com.ovcors.godlife.api.service.UserServiceImpl;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/join")
    public ResponseEntity<BaseResponseEntity> join(@RequestBody JoinReqDto joinReqDto) {
        System.out.println("userService -> "+userService);
        userService.join(joinReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping("/info")
    public ResponseEntity<BaseResponseEntity> getInfo(@Auth User user) {

        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
}
