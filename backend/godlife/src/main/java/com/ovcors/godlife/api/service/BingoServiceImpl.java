package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.SaveBingoReqDto;
import com.ovcors.godlife.api.dto.request.SaveCommentReqDto;
import com.ovcors.godlife.api.dto.request.UpdateTitleReqDto;
import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.Comment;
import com.ovcors.godlife.core.domain.goals.BingoGoals;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.queryrepository.BingoQueryRepository;
import com.ovcors.godlife.core.queryrepository.CommentQueryRepository;
import com.ovcors.godlife.core.repository.BingoGoalsRepository;
import com.ovcors.godlife.core.repository.BingoRepository;
import com.ovcors.godlife.core.repository.GoalsRepository;
import com.ovcors.godlife.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class BingoServiceImpl implements BingoService{

    private final BingoRepository bingoRepository;
    private final BingoQueryRepository bingoQueryRepository;
    private final UserRepository userRepository;
    private final BingoGoalsRepository bingoGoalsRepository;
    private final GoalsRepository goalsRepository;

    public Long createBingo(String userEmail, SaveBingoReqDto reqDto) {
        User user =  userRepository.findByEmailAndDeletedFalse(userEmail);

        Bingo bingo = reqDto.toEntity();
        bingo.setUser(user);

        Collections.shuffle(reqDto.getGoals());

        for(Long i : reqDto.getGoals()){
            Goals goal = goalsRepository.findById(i)
                    .orElseThrow(() -> new CustomException(ErrorCode.GOALS_NOT_FOUND));
            bingoGoalsRepository.save(BingoGoals.builder()
                    .bingo(bingo)
                    .goals(goal)
                    .build());
        }
        Bingo savedBingo = bingoRepository.save(bingo);
        return savedBingo.getBingoCode().getCode();

    }

    public List<FindBingoResDto> findAllBingo(String userEmail, int page, int limit) {
        List<Bingo> bingos = bingoQueryRepository.findPageByUser(userEmail, page, limit);
        List<FindBingoResDto> response = new ArrayList<>();
        for(Bingo bingo : bingos){
            response.add(new FindBingoResDto(bingo));
        }
        return response;
    }

    public FindBingoResDto findBingo(Long code){
        Bingo bingo = bingoQueryRepository.findBingo(code);
        return new FindBingoResDto(bingo);
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
