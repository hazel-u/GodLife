package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.ChangePasswordReqDto;
import com.ovcors.godlife.api.dto.request.ChangeUserInfoReqDto;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.response.GodLifeResDto;
import com.ovcors.godlife.api.dto.response.UserInfoResDto;
import com.ovcors.godlife.core.domain.user.User;

public interface UserService {
    User join(JoinReqDto joinReqDto);
    UserInfoResDto getUserInfo(Long seq);
    void setUserInfo(Long seq, ChangeUserInfoReqDto changeUserInfoReqDto);
    void deleteUser(Long seq);
    Boolean duplicatedEmail(String email);
    Boolean duplicatedName(String name);
    Boolean changePassword(Long seq, ChangePasswordReqDto changePasswordReqDto);
    GodLifeResDto getGodLife(Long seq);
}
