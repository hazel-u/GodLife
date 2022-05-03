package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.*;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.dto.response.BingoCountResDto;
import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.dto.response.SaveBingoResDto;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.BingoService;
import com.ovcors.godlife.api.service.FollowService;
import com.ovcors.godlife.core.domain.user.Follow;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/feed")
public class FeedController {

    private final FollowService followService;

    @PostMapping("/follow/{name}")
    public ResponseEntity<BaseResponseEntity> followUser(@Auth User user, @PathVariable String name) {
        followService.saveFollow(user, name);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @DeleteMapping("/follow/{name}")
    public ResponseEntity<BaseResponseEntity> unfollowUser(@Auth User user, @PathVariable String name) {
        followService.unfollow(user,name);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
}
