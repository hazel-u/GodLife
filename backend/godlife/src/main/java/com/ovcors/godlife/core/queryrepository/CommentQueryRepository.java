package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.core.domain.bingo.Comment;

import java.util.List;

public interface CommentQueryRepository {
    List<Comment> findAllByBingoCode(Long code);
}
