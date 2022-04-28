package com.ovcors.godlife.core.queryrepository;

import com.ovcors.godlife.api.dto.response.FindBingoResDto;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.BingoCode;
import com.ovcors.godlife.core.domain.bingo.Comment;
import com.ovcors.godlife.core.domain.goals.BingoGoals;
import com.ovcors.godlife.core.domain.goals.Goals;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.BingoGoalsRepository;
import com.ovcors.godlife.core.repository.BingoRepository;
import com.ovcors.godlife.core.repository.GoalsRepository;
import com.ovcors.godlife.core.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

    @Autowired
    GoalsRepository goalsRepository;

    @Autowired
    BingoGoalsRepository bingoGoalsRepository;


    @Test
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

        Goals goals = goalsRepository.save(new Goals());
        BingoGoals bingoGoals = BingoGoals.builder()
                .goals(goals)
                .bingo(bingo)
                .build();
        BingoGoals savedBingoGoals = bingoGoalsRepository.save(bingoGoals);

        bingo.setBingoCode(bingoCode);
        bingo.setUser(savedUser);
        bingo.addGoal(savedBingoGoals);

        Bingo savedBingo = bingoRepository.save(bingo);

        // when
        List<Bingo> result = bingoQueryRepository.findPageByUser(savedUser.getEmail(), 0, 5);

        // then
        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getSeq()).isEqualTo(savedBingo.getSeq());
        assertThat(result.get(0).getBingoGoals().size()).isEqualTo(1);
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
        BingoCode bingoCode = BingoCode.builder()
                .code(makeCode())
                .build();

        bingo.setBingoCode(bingoCode);
        bingo.setUser(savedUser);

        Bingo savedBingo = bingoRepository.save(bingo);

        // when
        Bingo result = bingoQueryRepository.findBingo(savedBingo.getBingoCode().getCode());

        // then
        assertThat(result.getSeq()).isEqualTo(savedBingo.getSeq());
        assertThat(result.getBingoCode().getCode()).isEqualTo(savedBingo.getBingoCode().getCode());
        assertThat(result.getTitle()).isEqualTo(savedBingo.getTitle());
    }

    private String makeCode() {
        String code = "";
        while(true) {
            code = RandomStringUtils.random(8, "0123456789abcdefABCDEF");
            if (bingoQueryRepository.findBingo(code) == null) break;
        }
        return code;
    }
}