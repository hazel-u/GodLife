package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindGoalsResDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import static com.ovcors.godlife.core.domain.goals.QGoals.goals;
import static com.ovcors.godlife.core.domain.user.QUser.user;

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
                .where(goals.user.email.eq(userEmail))
                .fetch();
    }
}
