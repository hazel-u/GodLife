package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGoalsRepository extends JpaRepository<User, Long> {
}
