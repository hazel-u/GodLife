package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.*;
import com.ovcors.godlife.api.dto.response.*;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.UserService;
import com.ovcors.godlife.config.jwt.JwtProperties;
import com.ovcors.godlife.core.domain.user.User;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

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
    public ResponseEntity<BaseResponseEntity> setUserInfo(@Auth User user, @RequestBody ChangeUserInfoReqDto changeUserInfoReqDto) {
        userService.setUserInfo(user.getSeq(), changeUserInfoReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @DeleteMapping("")
    public ResponseEntity<BaseResponseEntity> deleteUser(@Auth User user) {
        userService.deleteUser(user.getSeq());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/duplicate-email")
    public ResponseEntity<BaseResponseEntity> duplicatedEmail(@RequestBody DuplicatedEmailReqDto duplicatedEmailReqDto) {
        userService.duplicatedEmail(duplicatedEmailReqDto.getEmail());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/duplicate-name")
    public ResponseEntity<BaseResponseEntity> duplicatedEmail(@RequestBody DuplicatedNameReqDto duplicatedNameReqDto) {
        userService.duplicatedName(duplicatedNameReqDto.getName());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/change-pw")
    public ResponseEntity<BaseResponseEntity> changePassword(@Auth User user, @RequestBody ChangePasswordReqDto changePasswordReqDto) {
        userService.changePassword(user.getSeq(), changePasswordReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    // JWT 갱신
    @GetMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refreshToken = request.getHeader(JwtProperties.REFRESH_TOKEN_HEADER_STRING); // refresh token을 받음
        String newToken = userService.newToken(refreshToken);
        response.addHeader(JwtProperties.HEADER_STRING, newToken);
    }

    @GetMapping("/god-life")
    public ResponseEntity<GodLifeResDto> getGodLife(@Auth User user) {
        GodLifeResDto godLifeResDto = userService.getGodLife(user.getSeq());
        return ResponseEntity.ok().body(godLifeResDto);
    }

    // 2차 MVP
    // 다른 사람 정보 불러오기
    @GetMapping("/info/{name}")
    public ResponseEntity<SimpleUserInfoResDto> getOtherUserInfo(@PathVariable String name) {
        SimpleUserInfoResDto simpleUserInfoResDto = userService.getOtherUserInfo(name);
        return ResponseEntity.ok().body(simpleUserInfoResDto);
    }

    // 팔로워 목록 불러오기
    @GetMapping("/follower")
    public ResponseEntity<List<FollowInfoResDto>> getFollowerList(@Auth User user) {
        List<FollowInfoResDto> list = userService.getFollowerList(user.getSeq());
        return ResponseEntity.ok().body(list);
    }

    // 팔로잉 목록 불러오기
    @GetMapping("/following")
    public ResponseEntity<List<FollowInfoResDto>> getFollowingList(@Auth User user) {
        List<FollowInfoResDto> list = userService.getFollowingList(user.getSeq());
        return ResponseEntity.ok().body(list);
    }
}
