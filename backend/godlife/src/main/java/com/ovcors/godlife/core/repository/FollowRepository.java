package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.goals.BingoGoals;
import com.ovcors.godlife.core.domain.user.Follow;
import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FollowRepository extends JpaRepository<Follow, UUID> {
    Follow findTopFollowByFollowerAndFollowing(User follower, User following);
    List<Follow> findFollowByFollower(User following);
    List<Follow> findFollowByFollowing(User follower);

}
