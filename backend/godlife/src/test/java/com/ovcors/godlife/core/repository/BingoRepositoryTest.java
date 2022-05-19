package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.bingo.Bingo;
import com.ovcors.godlife.core.domain.bingo.Comment;
import com.ovcors.godlife.core.domain.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class BingoRepositoryTest {

    @Autowired
    private BingoRepository bingoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager em;

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

    @Test
    void findAllBingo() {
        // given
        User user = User.builder()
                .name("정음")
                .build();
        userRepository.save(user);
        Bingo bingo = Bingo.builder()
                .title("Hello world")
                .activate(true)
                .build();
        bingo.setUser(user);
        bingoRepository.save(bingo);

        // when
        List<Bingo> findBingos = bingoRepository.findAllByUserAndActivateTrue(user);

        // then
        assertThat(findBingos.size()).isEqualTo(1);
        assertThat(findBingos.get(0).getTitle()).isEqualTo(bingo.getTitle());
        assertThat(findBingos.get(0).getUser()).isEqualTo(user);
    }

    @Test
    void addComment() {
        // given
        Bingo bingo = Bingo.builder()
                .title("Hello world")
                .build();

        Bingo savedBingo = bingoRepository.save(bingo);

        // when
        Comment comment = Comment.builder()
                .content("comment")
                .build();
        savedBingo.addComment(comment);
        em.flush();

        // then
        Bingo findBingo = bingoRepository.findById(savedBingo.getSeq())
                .orElseThrow(()->new CustomException(ErrorCode.BINGO_NOT_FOUND));

        assertThat(findBingo.getComments().size()).isEqualTo(1);
        assertThat(findBingo.getComments().get(0).getContent()).isEqualTo("comment");
    }
}