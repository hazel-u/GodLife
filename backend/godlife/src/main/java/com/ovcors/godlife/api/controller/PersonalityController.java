package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.DeleteCommentDto;
import com.ovcors.godlife.api.dto.request.SaveUserPersonalReqDto;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.PersonalityService;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/personality")
@RequiredArgsConstructor
public class PersonalityController {

    private final PersonalityService personalityService;
    @PostMapping
    public ResponseEntity<BaseResponseEntity> saveUserPersonality(@Auth User user, @RequestBody SaveUserPersonalReqDto reqDto) {
        personalityService.setUserPersonality(user, reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

}
