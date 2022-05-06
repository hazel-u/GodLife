package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.dto.response.FollowInfoResDto;
import com.ovcors.godlife.core.domain.user.User;

import java.util.List;
import java.util.UUID;

public interface FollowService {
    void saveFollow(User user, String name);
    void unfollow(User user, String name);
    List<FollowInfoResDto>findUser(String name);
    List<FindBingoResDto> getFeed(UUID seq);
}
