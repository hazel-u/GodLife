package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.core.domain.goals.Goals;

import java.util.List;
import java.util.UUID;

public interface BingoQueryRepository {
    List<FindBingoResDto> findAllBingoByUser(String userEmail);
    FindBingoResDto findBingo(Long code);
}
