package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BingoRepository extends JpaRepository<Bingo, UUID> {
    List<Bingo> findAllByUserAndActivateTrue(User user);
    List<Bingo> findAllByUserAndActivateTrueOrderByStartDate(User user);
    List<Bingo> findAllByUserAndActivateTrueOrderByStartDateDesc(User user);
    Long countByUser(User user);
    Optional<Bingo> findTopByStartDateAndUserAndActivateTrue(LocalDate date, User user);
    List<Bingo> findTop6ByStartDateAndActivateTrueOrderByLikeCntDesc(LocalDate startdate);
}
