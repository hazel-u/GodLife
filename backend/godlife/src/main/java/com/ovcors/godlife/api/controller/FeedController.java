package com.ovcors.godlife.api.controller;

import ch.qos.logback.core.pattern.util.RegularEscapeUtil;
import com.ovcors.godlife.api.dto.request.*;
import com.ovcors.godlife.api.dto.response.*;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.BingoService;
import com.ovcors.godlife.api.service.FollowService;
import com.ovcors.godlife.core.domain.user.Follow;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.GeneratorType;
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
    @PostMapping("/user")
    public ResponseEntity<List<FollowInfoResDto>> getFollowingList(@RequestBody UserSearchingDto reqDto) {
        List<FollowInfoResDto> list= followService.findUser(reqDto.getKeyword());
        return ResponseEntity.ok().body(list);
    }
    @GetMapping
    public ResponseEntity<List<FindBingoResDto>> getFeed(@Auth User user) {
        List<FindBingoResDto> response = followService.getFeed(user.getSeq());
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("search/date/{date}")
    public ResponseEntity<List<FindBingoResDto>> findDateInFeed(@Auth User user,@PathVariable String date) throws ParseException {
       List<FindBingoResDto> response = followService.searchDateInFeed(user.getSeq(), date);
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("search/user/{keyword}")
    public ResponseEntity<List<FindBingoResDto>> findUserInFeed(@Auth User user,@PathVariable String keyword) {
        List<FindBingoResDto> response = followService.searchUserInFeed(user.getSeq(), keyword);
        return ResponseEntity.ok().body(response);
    }
    @GetMapping("/main")
    public ResponseEntity<List<FindBingoResDto>> getMainFeed(){
        List<FindBingoResDto> response = followService.getMainFeed();
        return ResponseEntity.ok().body(response);
    }
}
