package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.core.domain.user.User;

public interface UserService {
    User join(JoinReqDto joinReqDto);
}
