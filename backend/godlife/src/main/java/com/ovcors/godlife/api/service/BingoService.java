package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.DeleteCommentDto;
import com.ovcors.godlife.api.dto.request.SaveBingoReqDto;
import com.ovcors.godlife.api.dto.request.SaveCommentReqDto;
import com.ovcors.godlife.api.dto.request.UpdateTitleReqDto;
import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.user.User;

import java.text.ParseException;
import java.util.List;

public interface BingoService {
    Long createBingo(String userEmail, SaveBingoReqDto reqDto);
    List<FindBingoResDto> findAllBingo(String userEmail, int page, int limit);
    FindBingoResDto findBingo(Long code);
    void updateTitle(String seq, UpdateTitleReqDto reqDto);
    void updateActivate(String seq);
    void updateGodlife(String seq);
    void updateLikeCnt(String seq);
    void addComment(String seq, SaveCommentReqDto reqDto);
    void deletemyBingoComment(String seq, String userEmail);
    void deleteCommentByPassword(String seq, DeleteCommentDto reqDto);
    Long findBingoCount(User user);
    FindBingoResDto findBingoBydate(String date, User user)  throws ParseException;

}
