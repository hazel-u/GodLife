package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.*;
import com.ovcors.godlife.api.dto.response.*;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.UserService;
import com.ovcors.godlife.config.jwt.JwtProperties;
import com.ovcors.godlife.core.domain.user.User;
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

    // JWT ??????
    @GetMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refreshToken = request.getHeader(JwtProperties.REFRESH_TOKEN_HEADER_STRING); // refresh token??? ??????
        String newToken = userService.newToken(refreshToken);
        response.addHeader(JwtProperties.HEADER_STRING, newToken);
    }

    @GetMapping("/god-life")
    public ResponseEntity<GodLifeResDto> getGodLife(@Auth User user) {
        GodLifeResDto godLifeResDto = userService.getGodLife(user.getSeq());
        return ResponseEntity.ok().body(godLifeResDto);
    }

    // 2??? MVP
    // ?????? ?????? ?????? ????????????
    @GetMapping("/info/{name}")
    public ResponseEntity<OtherUserInfoResDto> getOtherUserInfo(@PathVariable String name) {
        OtherUserInfoResDto otherUserInfoResDto = userService.getOtherUserInfo(name);
        return ResponseEntity.ok().body(otherUserInfoResDto);
    }

    // ????????? ?????? ????????????
    @GetMapping("/follower")
    public ResponseEntity<List<FollowInfoResDto>> getFollowerList(@Auth User user) {
        List<FollowInfoResDto> list = userService.getFollowerList(user.getSeq());
        return ResponseEntity.ok().body(list);
    }

    // ????????? ?????? ????????????
    @GetMapping("/following")
    public ResponseEntity<List<FollowInfoResDto>> getFollowingList(@Auth User user) {
        List<FollowInfoResDto> list = userService.getFollowingList(user.getSeq());
        return ResponseEntity.ok().body(list);
    }

    // ??????????????? ??????
    @PatchMapping("/info")
    public ResponseEntity<BaseResponseEntity> changeStatus(@Auth User user, @RequestBody UpdateStatusReqDto updateStatusReqDto) {
        userService.changeStatus(user.getSeq(), updateStatusReqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    // ???????????? - refreshToken ??????
    @GetMapping("/logout")
    public ResponseEntity<BaseResponseEntity> logout(@Auth User user) {
        userService.logout(user.getSeq());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
}
