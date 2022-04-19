package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.JoinReqDto;

public interface UserService {
    void join(JoinReqDto joinReqDto);
}
