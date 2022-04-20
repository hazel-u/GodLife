package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BingoRepository extends JpaRepository<Bingo, UUID> {
}
