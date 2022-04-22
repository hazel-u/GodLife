package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.goals.BingoGoals;
import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BingoGoalsRepository extends JpaRepository<BingoGoals, UUID> {

}
