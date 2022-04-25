package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.ChangePasswordReqDto;
import com.ovcors.godlife.api.dto.request.ChangeUserInfoReqDto;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.response.GodLifeResDto;
import com.ovcors.godlife.api.dto.response.UserInfoResDto;
import com.ovcors.godlife.core.domain.user.User;

import java.util.UUID;

public interface UserService {
    User join(JoinReqDto joinReqDto);
    UserInfoResDto getUserInfo(UUID seq);
    void setUserInfo(UUID seq, ChangeUserInfoReqDto changeUserInfoReqDto);
    void deleteUser(UUID seq);
    Boolean duplicatedEmail(String email);
    Boolean duplicatedName(String name);
    Boolean changePassword(UUID seq, ChangePasswordReqDto changePasswordReqDto);
    GodLifeResDto getGodLife(UUID seq);
}
