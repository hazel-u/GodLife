package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.user.Follow;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.FollowRepository;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
public class FollowServiceImpl implements FollowService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    FollowRepository followRepository;

    @Override
    public void saveFollow(User user, String name) {
        User follower = user;
        User following = userRepository.findByNameAndDeletedFalse(name);
        if (following == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        followRepository.save(Follow.builder()
                .follower(follower)
                .following(following)
                .build()
        );
    }

    @Override
    public void unfollow(User user, String name) {
        User follower = user;
        User following = userRepository.findByNameAndDeletedFalse(name);
        if (following == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        Follow follow = followRepository.findFollowByFollowerAndFollowing(follower, following);
        if(follow != null){
            followRepository.deleteById(follow.getSeq());
        }
    }
}
