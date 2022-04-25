package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.bingo.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
}
