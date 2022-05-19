package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.user.Personality;
import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PersonalityRepository extends JpaRepository<Personality, UUID> {
    public Personality findByUser(User user);
}
