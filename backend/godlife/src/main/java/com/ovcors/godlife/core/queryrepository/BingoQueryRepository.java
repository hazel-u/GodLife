package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.core.domain.bingo.Bingo;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface BingoQueryRepository {
    List<Bingo> findPageByUser(String userEmail, int page, int limit);
    Bingo findBingo(Long code);
}
