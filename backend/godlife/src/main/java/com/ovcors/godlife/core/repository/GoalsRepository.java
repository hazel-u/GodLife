package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalsRepository extends JpaRepository<Goals, Long> {
    List<Goals> findAll();
}
