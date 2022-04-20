package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class BingoRepositoryTest {

    @Autowired
    private BingoRepository bingoRepository;

    @Test
    void createBingo() {
        // given
        Bingo bingo = Bingo.builder()
                .title("Hello world!")
                .build();

        // when
        Bingo savedBingo = bingoRepository.save(bingo);

        // then
        assertThat(savedBingo.getSeq()).isNotNull();
        assertThat(savedBingo.getTitle()).isEqualTo("Hello world!");
    }

    @Test
    void findBingo() {
        // given
        Bingo bingo = Bingo.builder()
                .title("Hello world")
                .build();
        Bingo savedBingo = bingoRepository.save(bingo);

        // when
        Bingo findBingo = bingoRepository.findById(savedBingo.getSeq())
                .orElseThrow(()-> new CustomException(ErrorCode.BINGO_NOT_FOUND));

        // then
        assertThat(findBingo.getTitle()).isEqualTo(savedBingo.getTitle());
    }
}