package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BingoRepository extends JpaRepository<Bingo, UUID> {
    List<Bingo> findAllByUser(User user);
}
