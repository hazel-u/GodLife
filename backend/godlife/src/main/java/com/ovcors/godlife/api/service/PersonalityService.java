package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.SaveUserPersonalReqDto;
import com.ovcors.godlife.core.domain.user.User;

public interface PersonalityService {
    void setUserPersonality(User user, SaveUserPersonalReqDto reqDto);
}
