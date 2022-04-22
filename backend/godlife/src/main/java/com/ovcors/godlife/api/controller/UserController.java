package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.*;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.dto.response.GodLifeResDto;
import com.ovcors.godlife.api.dto.response.UserInfoResDto;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.UserService;
import com.ovcors.godlife.core.domain.user.User;
import io.swagger.models.Response;
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
        userService.join(joinReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfoResDto> getUserInfo(@Auth User user) {
        UserInfoResDto userInfoResDto = userService.getUserInfo(user.getSeq());
        return ResponseEntity.ok().body(userInfoResDto);
    }

    @PostMapping("/info")
    public ResponseEntity<BaseResponseEntity> setUserInfo(@Auth User user, ChangeUserInfoReqDto changeUserInfoReqDto) {
        userService.setUserInfo(user.getSeq(), changeUserInfoReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<BaseResponseEntity> deleteUser(@Auth User user) {
        userService.deleteUser(user.getSeq());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/duplicate-email")
    public ResponseEntity<BaseResponseEntity> duplicatedEmail(DuplicatedEmailReqDto duplicatedEmailReqDto) {
        userService.duplicatedEmail(duplicatedEmailReqDto.getEmail());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/duplicate-name")
    public ResponseEntity<BaseResponseEntity> duplicatedEmail(DuplicatedNameReqDto duplicatedNameReqDto) {
        userService.duplicatedName(duplicatedNameReqDto.getName());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/change-pw")
    public ResponseEntity<BaseResponseEntity> changePassword(@Auth User user, ChangePasswordReqDto changePasswordReqDto) {
        userService.changePassword(user.getSeq(), changePasswordReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    // JWT 갱신

    @GetMapping("/god-life")
    public ResponseEntity<GodLifeResDto> getGodLife(@Auth User user) {
        GodLifeResDto godLifeResDto = userService.getGodLife(user.getSeq());
        return ResponseEntity.ok().body(godLifeResDto);
    }
}
