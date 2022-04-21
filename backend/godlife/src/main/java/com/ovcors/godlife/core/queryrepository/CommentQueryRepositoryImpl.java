package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.core.domain.bingo.Comment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ovcors.godlife.core.domain.bingo.QComment.comment;

@Repository
@Transactional
@RequiredArgsConstructor
public class CommentQueryRepositoryImpl implements CommentQueryRepository{

    private final JPAQueryFactory query;

    @Override
    public List<Comment> findAllByBingoCode(Long code) {
        return query
                .selectFrom(comment)
                .where(comment.bingo.bingoCode.code.eq(code))
                .fetch();
    }
}
