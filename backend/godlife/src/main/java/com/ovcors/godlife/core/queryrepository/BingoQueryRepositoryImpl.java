package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.ovcors.godlife.core.domain.bingo.QBingo.bingo;
import static com.ovcors.godlife.core.domain.goals.QBingoGoals.bingoGoals;
import static com.ovcors.godlife.core.domain.goals.QGoals.goals;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;


@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BingoQueryRepositoryImpl implements BingoQueryRepository{

    private final JPAQueryFactory query;

    @Override
    public List<FindBingoResDto> findAllBingoByUser(String userEmail) {
        Map<Bingo, List<Goals>> transform = query
                .from(bingo)
                .leftJoin(bingo.bingoGoals, bingoGoals)
                .leftJoin(bingoGoals.goals, goals)
                .where(bingo.user.email.eq(userEmail))
                .transform(groupBy(bingo).as(list(goals)));

        return extractFindBingoResDto(transform);
    }

    @Override
    public FindBingoResDto findBingo(Long code) {
        Map<Bingo, List<Goals>> transform = query
                .from(bingo)
                .leftJoin(bingo.bingoGoals, bingoGoals)
                .leftJoin(bingoGoals.goals, goals)
                .where(bingo.bingoCode.code.eq(code))
                .transform(groupBy(bingo).as(list(goals)));

        return extractFindBingoResDto(transform).get(0);
    }

    private List<FindBingoResDto> extractFindBingoResDto(Map<Bingo, List<Goals>> transform) {
        return transform.entrySet().stream()
                .map(entry -> FindBingoResDto.builder()
                        .id(entry.getKey().getSeq())
                        .code(entry.getKey().getBingoCode().getCode())
                        .title(entry.getKey().getTitle())
                        .userEmail(entry.getKey().getUser().getEmail())
                        .activate(entry.getKey().getActivate())
                        .godlife(entry.getKey().getGodlife())
                        .startDate(entry.getKey().getStartDate())
                        .likeCnt(entry.getKey().getLikeCnt())
                        .commentCnt(entry.getKey().getCommentCnt())
                        .goals(entry.getValue())
                        .build())
                .collect(Collectors.toList());
    }
}
