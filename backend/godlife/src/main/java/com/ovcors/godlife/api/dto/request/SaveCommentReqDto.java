package com.ovcors.godlife.api.dto.request;

import com.ovcors.godlife.core.domain.bingo.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SaveCommentReqDto {
    @NotNull
    String content;
    @NotNull
    String nickname;
    @NotNull
    String password;

    public Comment toEntity() {
        return Comment.builder()
                .content(content)
                .nickname(nickname)
                .password(password)
                .build();
    }
}
