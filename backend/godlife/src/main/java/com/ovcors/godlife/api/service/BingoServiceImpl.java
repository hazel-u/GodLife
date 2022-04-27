package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.DeleteCommentDto;
import com.ovcors.godlife.api.dto.request.SaveBingoReqDto;
import com.ovcors.godlife.api.dto.request.SaveCommentReqDto;
import com.ovcors.godlife.api.dto.request.UpdateTitleReqDto;
import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.BingoCode;
import com.ovcors.godlife.core.domain.bingo.Comment;
import com.ovcors.godlife.core.domain.goals.BingoGoals;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.queryrepository.BingoQueryRepository;
import com.ovcors.godlife.core.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class BingoServiceImpl implements BingoService {

    private final BingoRepository bingoRepository;
    private final BingoQueryRepository bingoQueryRepository;
    private final UserRepository userRepository;
    private final BingoGoalsRepository bingoGoalsRepository;
    private final GoalsRepository goalsRepository;
    private final CommentRepository commentRepository;

    public Long createBingo(String userEmail, SaveBingoReqDto reqDto) {
        User user = userRepository.findByEmailAndDeletedFalse(userEmail);
        BingoCode bingoCode = BingoCode.builder().build();

        Bingo bingo = reqDto.toEntity();
        bingo.setUser(user);
        bingo.setBingoCode(bingoCode);

        Collections.shuffle(reqDto.getGoals());

        for (Long i : reqDto.getGoals()) {
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
        for (Bingo bingo : bingos) {
            response.add(new FindBingoResDto(bingo));
        }
        return response;
    }

    public FindBingoResDto findBingo(Long code) {
        Bingo bingo = bingoQueryRepository.findBingo(code);
        if (bingo == null) {
            throw new CustomException(ErrorCode.BINGO_NOT_FOUND);
        }
        return new FindBingoResDto(bingo);
    }

    public void updateTitle(String seq, UpdateTitleReqDto reqDto) {
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(() -> new CustomException(ErrorCode.BINGO_NOT_FOUND));
        bingo.changeTitle(reqDto.getTitle());
    }

    public void updateActivate(String seq) {
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(() -> new CustomException(ErrorCode.BINGO_NOT_FOUND));
        bingo.changeActivate();
    }

    public void updateGodlife(String seq) {
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(() -> new CustomException(ErrorCode.BINGO_NOT_FOUND));
        User user = bingo.getUser();

        user.addgodCount();
        bingo.changeGodlife();

        LocalDate date = user.getRecentDate();
        if (date == null) {
            user.setRecentDate();
        } else {
            LocalDate current = LocalDate.now();
            Period period = Period.between(date, current);
            if (period.getDays() > 1) {
                user.setRecentDate();
            }
        }
    }

    public void updateLikeCnt(String seq) {
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(() -> new CustomException(ErrorCode.BINGO_NOT_FOUND));
        bingo.changeLike();
    }

    public void addComment(String seq, SaveCommentReqDto reqDto) {
        Bingo bingo = bingoRepository.findById(UUID.fromString(seq))
                .orElseThrow(() -> new CustomException(ErrorCode.BINGO_NOT_FOUND));
        Comment comment = reqDto.toEntity();
        bingo.addComment(comment);

        commentRepository.save(comment);
    }

    @Override
    public void deletemyBingoComment(String seq, String userEmail) {
        Comment comment = commentRepository.findById(UUID.fromString(seq))
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
        Bingo bingo = comment.getBingo();
        if (bingo.getUser().getEmail().equals(userEmail)) {
            commentRepository.deleteById(UUID.fromString(seq));
        } else {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        }
    }

    @Override
    public void deleteCommentByPassword(String seq, DeleteCommentDto reqDto) {
        Comment comment = commentRepository.findById(UUID.fromString(seq))
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
        if (comment.getPassword().equals(reqDto.getPassword())) {
            commentRepository.deleteById(UUID.fromString(seq));
        } else {
            throw new CustomException(ErrorCode.WRONG_PASSWORD);
        }
    }

    public Long findBingoCount(User user) {
        return bingoRepository.countByUser(user);
    }

    @Override
    public FindBingoResDto findBingoBydate(String date, User user) throws ParseException {
        LocalDate startdate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        Bingo bingo = bingoRepository.findTopByStartDateAndUser(startdate, user)
                .orElseThrow(() -> new CustomException(ErrorCode.BINGO_DATE_NOT_FOUND));
        ;
        return new FindBingoResDto(bingo);
    }


}
