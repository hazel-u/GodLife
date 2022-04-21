package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.SaveBingoReqDto;
import com.ovcors.godlife.api.dto.request.SaveCommentReqDto;
import com.ovcors.godlife.api.dto.request.UpdateTitleReqDto;
import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.Comment;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.queryrepository.BingoQueryRepository;
import com.ovcors.godlife.core.queryrepository.CommentQueryRepository;
import com.ovcors.godlife.core.repository.BingoRepository;
import com.ovcors.godlife.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class BingoServiceImpl implements BingoService{

    private final BingoRepository bingoRepository;
    private final BingoQueryRepository bingoQueryRepository;
    private final CommentQueryRepository commentQueryRepository;
    private final UserRepository userRepository;

    public Bingo createBingo(String userEmail, SaveBingoReqDto reqDto) {
        User user =  userRepository.findByEmailAndDeletedFalse(userEmail);

        /* goals 생성 */

        Bingo bingo = reqDto.toEntity();
        bingo.setUser(user);

        return bingoRepository.save(bingo);
    }

    public List<FindBingoResDto> findAllBingo(String userEmail) {
        List<FindBingoResDto> response = bingoQueryRepository.findAllBingoByUser(userEmail);
        return response;
    }

    public FindBingoResDto findBingo(Long code){
        FindBingoResDto response = bingoQueryRepository.findBingo(code);
        List<Comment> comments = commentQueryRepository.findAllByBingoCode(code);
        response.addComments(comments);
        return response;
    }

    public void updateTitle(String seq, UpdateTitleReqDto reqDto) {
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(()->new CustomException(ErrorCode.BINGO_NOT_FOUND));
        bingo.changeTitle(reqDto.getTitle());
    }

    public void updateActivate(String seq) {
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(()->new CustomException(ErrorCode.BINGO_NOT_FOUND));
        bingo.changeActivate();
    }

    public void updateGodlife(String seq){
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(()->new CustomException(ErrorCode.BINGO_NOT_FOUND));
        bingo.changeGodlife();
    }

    public void updateLikeCnt(String seq){
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(()->new CustomException(ErrorCode.BINGO_NOT_FOUND));
        bingo.changeLike();
    }

    public void addComment(String seq, SaveCommentReqDto reqDto) {
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(()->new CustomException(ErrorCode.BINGO_NOT_FOUND));
        Comment comment = reqDto.toEntity();
        bingo.addComment(comment);
    }
}
