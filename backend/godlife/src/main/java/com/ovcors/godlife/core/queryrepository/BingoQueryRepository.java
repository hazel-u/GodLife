package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;

import java.util.List;

public interface BingoQueryRepository {
    List<FindBingoResDto> findAllBingoByUser(String userEmail);
    FindBingoResDto findBingo(Long code);
}
