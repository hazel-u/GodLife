package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.SaveBingoReqDto;
import com.ovcors.godlife.api.dto.request.SaveCommentReqDto;
import com.ovcors.godlife.api.dto.request.UpdateTitleReqDto;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.BingoRepository;
import com.ovcors.godlife.core.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class BingoServiceTest {

    @InjectMocks
    BingoServiceImpl bingoService;

    @Mock
    BingoRepository bingoRepository;

    @Mock
    UserRepository userRepository;

    final String userEmail = "wjddma1214@gmail.com";

    void setUp(){
        given(userRepository.findByEmailAndDeletedFalse(any())).willReturn(user());
    }

    @Test
    void findAllBingo() {
        // given
        setUp();
        List<Bingo> expected = new ArrayList<>();
        expected.add(bingo());
        given(bingoRepository.findAllByUser(any(User.class))).willReturn(expected);

        // when
        List<Bingo> result = bingoService.findAllBingo(userEmail);

        // then
        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Hello world");

        verify(userRepository, times(1)).findByEmailAndDeletedFalse(userEmail);
        verify(bingoRepository, times(1)).findAllByUser(any(User.class));
    }

    @Test
    void findBingo() {
        // given
        UUID id = UUID.randomUUID();
        given(bingoRepository.findById(id)).willReturn(Optional.of(bingo()));

        // when
        Bingo result = bingoService.findBingo(id.toString());

        // then
        assertThat(result.getTitle()).isEqualTo("Hello world");
        verify(bingoRepository, times(1)).findById(id);
    }

    @Test
    void createBingo() {
        // given
        setUp();
        SaveBingoReqDto reqDto = SaveBingoReqDto.builder()
                .title("Hello world")
                .build();
        given(bingoRepository.save(any(Bingo.class))).willReturn(bingo());

        // when
        Bingo result = bingoService.createBingo(userEmail, reqDto);

        // then
        assertThat(result.getTitle()).isEqualTo("Hello world");
        assertThat(result.getUser().getName()).isEqualTo("정음");

        // verify
        verify(userRepository, times(1)).findByEmailAndDeletedFalse(userEmail);
        verify(bingoRepository, times(1)).save(any(Bingo.class));
    }

    @Test
    void updateBingoTitle() {
        // given
        UUID seq = UUID.randomUUID();
        given(bingoRepository.findById(seq)).willReturn(Optional.of(bingo()));
        UpdateTitleReqDto reqDto = new UpdateTitleReqDto("Modify title");

        // when
        bingoService.updateTitle(seq.toString(), reqDto);

        // then
        verify(bingoRepository, times(1)).findById(seq);
    }

    private User user() {
        return User.builder()
                .name("정음")
                .build();
    }

    private Bingo bingo() {
        return Bingo.builder()
                .title("Hello world")
                .user(user())
                .activate(true)
                .startDate(LocalDate.now())
                .godlife(false)
                .likeCnt(0)
                .build();
    }
}