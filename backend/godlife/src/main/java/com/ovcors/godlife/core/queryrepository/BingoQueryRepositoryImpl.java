package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
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
    public List<Bingo> findPageByUser(String userEmail, int page, int limit) {
        return query
                .selectFrom(bingo)
                .where(bingo.user.email.eq(userEmail))
                .orderBy(bingo.startDate.desc())
                .offset(page*limit)
                .limit(limit)
                .fetch();
    }

    @Override
    public Bingo findBingo(Long code) {
        return query
                .selectFrom(bingo)
                .where(bingo.bingoCode.code.eq(code))
                .fetchOne();
    }
}
