package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ovcors.godlife.core.domain.bingo.QBingo.bingo;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BingoQueryRepositoryImpl implements BingoQueryRepository{

    private final JPAQueryFactory query;

    @Override
    public List<FindBingoResDto> findAllBingoByUser(String userEmail) {
        return query
                .select(Projections.constructor(FindBingoResDto.class,
                        bingo.seq,
                        bingo.bingoCode.code,
                        bingo.title,
                        bingo.user.email,
                        bingo.activate,
                        bingo.godlife,
                        bingo.startDate,
                        bingo.likeCnt,
                        bingo.comments.size()
                ))
                .from(bingo)
                .where(bingo.user.email.eq(userEmail))
                .fetch();
    }

    @Override
    public FindBingoResDto findBingo(Long code) {
        return query
                .select(Projections.constructor(FindBingoResDto.class,
                        bingo.seq,
                        bingo.bingoCode.code,
                        bingo.title,
                        bingo.user.email,
                        bingo.activate,
                        bingo.godlife,
                        bingo.startDate,
                        bingo.likeCnt,
                        bingo.comments.size()))
                .from(bingo)
                .where(bingo.bingoCode.code.eq(code))
                .fetchOne();
    }
}
