package com.ovcors.godlife.api.controller;

import com.ovcors.godlife.api.dto.request.DeleteCommentDto;
import com.ovcors.godlife.api.dto.request.SaveBingoReqDto;
import com.ovcors.godlife.api.dto.request.SaveCommentReqDto;
import com.ovcors.godlife.api.dto.request.UpdateTitleReqDto;
import com.ovcors.godlife.api.dto.response.BaseResponseEntity;
import com.ovcors.godlife.api.dto.response.BingoCountResDto;
import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.api.dto.response.SaveBingoResDto;
import com.ovcors.godlife.api.resolver.Auth;
import com.ovcors.godlife.api.service.BingoService;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bingo")
public class BingoController {

    private final BingoService bingoService;

    @GetMapping("/{page}/{limit}")
    public ResponseEntity<List<FindBingoResDto>> findAllByUser(@Auth User user, @PathVariable int page, @PathVariable int limit) {
        List<FindBingoResDto> response = bingoService.findAllBingo(user.getEmail(), page, limit);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{code}")
    public ResponseEntity<FindBingoResDto> findByCode(@PathVariable Long code) {
        FindBingoResDto response = bingoService.findBingo(code);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<SaveBingoResDto> saveBingo(@Auth User user, @RequestBody @Valid SaveBingoReqDto reqDto) {
        Long code = bingoService.createBingo(user.getEmail(), reqDto);
        return ResponseEntity.ok().body(new SaveBingoResDto(code));
    }

    @PutMapping("/{seq}")
    public ResponseEntity<BaseResponseEntity> updateTitle(@PathVariable String seq, @RequestBody @Valid UpdateTitleReqDto reqDto) {
        bingoService.updateTitle(seq, reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/{seq}/activate")
    public ResponseEntity<BaseResponseEntity> updateActivate(@PathVariable String seq) {
        bingoService.updateActivate(seq);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/{seq}/godlife")
    public ResponseEntity<BaseResponseEntity> updateGodlife(@PathVariable String seq) {
        bingoService.updateGodlife(seq);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PutMapping("/{seq}/like")
    public ResponseEntity<BaseResponseEntity> updateLikeCnt(@PathVariable String seq) {
        bingoService.updateLikeCnt(seq);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @PostMapping("/{seq}/comment")
    public ResponseEntity<BaseResponseEntity> addComment(@PathVariable String seq, @RequestBody SaveCommentReqDto reqDto) {
        bingoService.addComment(seq, reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }

    @DeleteMapping("/comment/{seq}")
    public ResponseEntity<BaseResponseEntity> deletemyBingoComment(@Auth User user,@PathVariable String seq) {
        bingoService.deletemyBingoComment(seq, user.getEmail());
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
    @PostMapping("/comment/{seq}")
    public ResponseEntity<BaseResponseEntity> deletemyBingoComment(@PathVariable String seq, @RequestBody DeleteCommentDto reqDto) {
        bingoService.deleteCommentByPassword(seq, reqDto);
        return ResponseEntity.ok().body(new BaseResponseEntity(200, "Success"));
    }
    @GetMapping("/count")
    public ResponseEntity<BingoCountResDto> findBingoCountByUser(@Auth User user) {
        Long count = bingoService.findBingoCount(user);
        return ResponseEntity.ok().body(new BingoCountResDto(count));
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<FindBingoResDto> findBingByDate(@Auth User user, @PathVariable String date) throws ParseException {
        FindBingoResDto response = bingoService.findBingoBydate(date, user);
        return ResponseEntity.ok().body(response);
    }

}
