package com.ovcors.godlife.core.repository;

import com.ovcors.godlife.core.domain.user.JoinType;
import com.ovcors.godlife.core.domain.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void UserRepositoryIsNotNull() {
        assertThat(userRepository).isNotNull();
    }

    @Test
    public void joinUserTest() {
        // given
        final User user = User.builder()
                .email("userEmail")
                .password("1234")
                .name("test계정")
                .oauth_type(JoinType.NATIVE)
                .deleted(false)
                .recentDate(null)
                .godCount(0)
                .build();

        // when
        final User result = userRepository.save(user);

        //then
        assertThat(result.getSeq()).isNotNull();
        assertThat(result.getEmail()).isEqualTo("userEmail");
        assertThat(result.getOauth_type()).isEqualTo(JoinType.NATIVE);
        assertThat(result.getPassword()).isEqualTo("1234");
        assertThat(result.getName()).isEqualTo("test계정");
    }

    @Test
    public void findUserByEmailTest() {
        // given
        final User user = User.builder()
                .email("userEmail")
                .password("1234")
                .name("test계정")
                .oauth_type(JoinType.NATIVE)
                .deleted(false)
                .recentDate(null)
                .godCount(0)
                .serialGodCount(0)
                .info(null)
                .build();

        // when
        userRepository.save(user);
        final User findResult = userRepository.findByEmailAndDeletedFalse("userEmail");

        // then
        assertThat(findResult).isNotNull();
        assertThat(findResult.getSeq()).isNotNull();
        assertThat(findResult.getEmail()).isEqualTo("userEmail");
        assertThat(findResult.getOauth_type()).isEqualTo(JoinType.NATIVE);
        assertThat(findResult.getName()).isEqualTo("test계정");
    }

    @Test
    public void findUserByNameTest() {
        // given
        final User user = User.builder()
                .email("userEmail")
                .password("1234")
                .name("test계정")
                .oauth_type(JoinType.NATIVE)
                .deleted(false)
                .recentDate(null)
                .godCount(0)
                .serialGodCount(0)
                .info(null)
                .build();

        // when
        userRepository.save(user);
        final User findResult = userRepository.findByNameAndDeletedFalse("test계정");

        // then
        assertThat(findResult).isNotNull();
        assertThat(findResult.getSeq()).isNotNull();
        assertThat(findResult.getEmail()).isEqualTo("userEmail");
        assertThat(findResult.getOauth_type()).isEqualTo(JoinType.NATIVE);
        assertThat(findResult.getName()).isEqualTo("test계정");
    }
}