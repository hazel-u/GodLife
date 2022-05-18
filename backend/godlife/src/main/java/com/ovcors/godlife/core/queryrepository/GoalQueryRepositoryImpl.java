package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindGoalsResDto;
import com.ovcors.godlife.api.dto.response.RecommendGoalsResDto;
import com.ovcors.godlife.core.domain.user.PersonalityType;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import static com.ovcors.godlife.core.domain.bingo.QBingo.bingo;
import static com.ovcors.godlife.core.domain.goals.QGoals.goals;
import static com.ovcors.godlife.core.domain.goals.QBingoGoals.bingoGoals;
import static com.ovcors.godlife.core.domain.user.QPersonality.personality;

@Repository
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GoalQueryRepositoryImpl implements GoalQueryRepository{

    private final JPAQueryFactory query;

    @Override
    public List<FindGoalsResDto> findBasicGoals() {
        return query
                .select(Projections.constructor(FindGoalsResDto.class,
                        goals.seq,
                        goals.content,
                        goals.category))
                .from(goals)
                .where(goals.user.isNull())
                .fetch();
    }

    @Override
    public List<FindGoalsResDto> findCustomGoalsByUserEmail(String userEmail) {
        return query
                .select(Projections.constructor(FindGoalsResDto.class,
                        goals.seq,
                        goals.content,
                        goals.category))
                .from(goals)
                .where(goals.user.email.eq(userEmail)
                        .and(goals.deleted.eq(false)))
                .fetch();
    }

    @Override
    public List<RecommendGoalsResDto> findRecommendGoalsByPersonality(PersonalityType personalityType) {
        return query
                .select(Projections.constructor(RecommendGoalsResDto.class,
                        bingoGoals.goals.seq,
                        bingoGoals.goals.count(),
                        bingoGoals.goals.content
                        )
                )
                .from(bingoGoals)
                .where(bingoGoals.bingo.seq.in(
                        JPAExpressions.select(bingo.seq)
                                .from(bingo)
                                .where(bingo.user.seq.in(JPAExpressions
                                        .select(personality.user.seq)
                                        .from(personality)
                                        .where(personality.personalityType.eq(personalityType)))
                                )
                        )
                )
                .groupBy(bingoGoals.goals.seq)
                .orderBy(bingoGoals.goals.seq.count().desc())
                .limit(9)
                .fetch();
    }

}
