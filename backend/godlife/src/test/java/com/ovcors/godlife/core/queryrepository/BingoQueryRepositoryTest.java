package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.BingoCode;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.BingoRepository;
import com.ovcors.godlife.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class BingoQueryRepositoryTest {

    @Autowired
    BingoRepository bingoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BingoQueryRepository bingoQueryRepository;

    @Test
    @Commit
    void findAllBingoByUser() {
        // given
        User user = User.builder()
                .email("wjddma1214@gmail.com")
                .build();
        User savedUser = userRepository.save(user);
        Bingo bingo = Bingo.builder()
                .title("Hello world")
                .build();
        BingoCode bingoCode = new BingoCode();

        bingo.setBingoCode(bingoCode);
        bingo.setUser(savedUser);

        Bingo savedBingo = bingoRepository.save(bingo);

        // when
        System.out.println(bingoRepository.count());
        List<FindBingoResDto> result = bingoQueryRepository.findAllBingoByUser(savedUser.getEmail());

        // then
        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getId()).isEqualTo(savedBingo.getSeq());
    }

    @Test
    void findBingo() {
        // given
        User user = User.builder()
                .email("wjddma1214@gmail.com")
                .build();
        User savedUser = userRepository.save(user);
        Bingo bingo = Bingo.builder()
                .title("Hello world")
                .build();
        BingoCode bingoCode = new BingoCode();

        bingo.setBingoCode(bingoCode);
        bingo.setUser(savedUser);

        Bingo savedBingo = bingoRepository.save(bingo);

        // when
        FindBingoResDto result = bingoQueryRepository.findBingo(savedBingo.getBingoCode().getCode());

        // then
        assertThat(result.getId()).isEqualTo(savedBingo.getSeq());
        assertThat(result.getCode()).isEqualTo(savedBingo.getBingoCode().getCode());
        assertThat(result.getTitle()).isEqualTo(savedBingo.getTitle());
    }
}