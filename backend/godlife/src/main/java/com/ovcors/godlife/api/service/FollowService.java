package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.dto.response.FollowInfoResDto;
import com.ovcors.godlife.core.domain.user.User;

import java.util.List;

public interface FollowService {
    void saveFollow(User user, String name);
    void unfollow(User user, String name);
    List<FollowInfoResDto>findUser(String name);
}
