package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.dto.response.FindUserResDto;
import com.ovcors.godlife.api.dto.response.FollowInfoResDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.user.Follow;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.BingoRepository;
import com.ovcors.godlife.core.repository.FollowRepository;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class FollowServiceImpl implements FollowService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    FollowRepository followRepository;
    @Autowired
    BingoRepository bingoRepository;

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
        Follow follow = followRepository.findTopFollowByFollowerAndFollowing(follower, following);
        if (follow != null) {
            followRepository.deleteById(follow.getSeq());
        }
    }

    @Override
    public List<FindUserResDto> findUser(UUID seq, String name) {
        User user = userRepository.findById(seq).get();
        List<User> list = userRepository.findByNameContaining(name);
        List<FindUserResDto> response = new ArrayList<>();
        List<User> followingUser = new ArrayList<>();
        for (Follow follow : user.getFollower()) {
            followingUser.add(follow.getFollowing());
        }

        for (User resultuser : list) {
            boolean isFollowing = followingUser.contains(resultuser);
            if (resultuser.getSeq() != seq)
                response.add(new FindUserResDto(resultuser.getName(), resultuser.getSerialGodCount(), resultuser.getGodCount(), isFollowing));
        }
        return response;
    }

    @Override
    public List<FindBingoResDto> getFeed(UUID seq) {
        if (seq == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        List<FindBingoResDto> response = new ArrayList<>();
        User user = userRepository.findById(seq).get();

        for (Follow follow : user.getFollower()) {
            User followingUser = follow.getFollowing();
            List<Bingo> list = bingoRepository.findAllByUserAndActivateTrue(followingUser);
            for (Bingo bingo : list) {
                response.add(new FindBingoResDto(bingo));
            }
        }
        return response;
    }

    @Override
    public List<FindBingoResDto> searchUserInFeed(UUID seq, String keyword) {
        if (seq == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        List<FindBingoResDto> response = new ArrayList<>();
        User user = userRepository.findById(seq).get();

        for (Follow follow : user.getFollower()) {
            User followingUser = follow.getFollowing();
            if (followingUser.getName().contains(keyword)) {
                List<Bingo> list = bingoRepository.findAllByUserAndActivateTrue(followingUser);
                for (Bingo bingo : list) {
                    response.add(new FindBingoResDto(bingo));
                }
            }
        }
        return response;
    }

    @Override
    public List<FindBingoResDto> searchDateInFeed(UUID seq, String date) throws ParseException {
        LocalDate startdate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        List<FindBingoResDto> response = new ArrayList<>();
        User user = userRepository.findById(seq).get();

        for (Follow follow : user.getFollower()) {
            User followingUser = follow.getFollowing();
            List<Bingo> list = bingoRepository.findAllByUserAndActivateTrue(followingUser);
            for (Bingo bingo : list) {
                if (bingo.getStartDate().equals(startdate))
                    response.add(new FindBingoResDto(bingo));
            }
        }
        return response;
    }

    @Override
    public List<FindBingoResDto> getMainFeed() {
        final int limit = 6;
        List<FindBingoResDto> response = new ArrayList<>();
        List<Bingo> bingos = bingoRepository.findTop6ByStartDateAndActivateTrueOrderByLikeCnt(LocalDate.now());
        for (Bingo bingo : bingos) {
            response.add(new FindBingoResDto(bingo));
        }
        return response;
    }
}
