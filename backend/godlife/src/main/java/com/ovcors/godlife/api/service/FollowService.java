package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.dto.response.FindUserResDto;
import com.ovcors.godlife.api.dto.response.FollowInfoResDto;
import com.ovcors.godlife.core.domain.user.User;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

public interface FollowService {
    void saveFollow(User user, String name);
    void unfollow(User user, String name);
    List<FindUserResDto>findUser(UUID seq,String name);
    List<FindBingoResDto> getFeed(UUID seq);
    List<FindBingoResDto> searchUserInFeed(UUID seq, String keyword);
    List<FindBingoResDto> searchDateInFeed(UUID seq, String date) throws ParseException;
    List<FindBingoResDto> getMainFeed();
}
