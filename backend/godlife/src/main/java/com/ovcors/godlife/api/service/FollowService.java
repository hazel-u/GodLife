package com.ovcors.godlife.api.service;

import com.ovcors.godlife.core.domain.user.User;

public interface FollowService {
    void saveFollow(User user, String name);
    void unfollow(User user, String name);

  }
