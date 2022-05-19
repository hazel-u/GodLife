package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.request.ChangePasswordReqDto;
import com.ovcors.godlife.api.dto.request.ChangeUserInfoReqDto;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.dto.response.GodLifeResDto;
import com.ovcors.godlife.api.dto.response.UserInfoResDto;
import com.ovcors.godlife.core.domain.user.JoinType;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Spy
    BCryptPasswordEncoder bCryptPasswordEncoder;

    private final String email = "test@naver.com";
    private final String password = "1234";
    private final String name = "테스트계정";

    @Test
    void join() {
        // given
        doReturn(null).when(userRepository).findByEmailAndDeletedFalse(email);
        doReturn(user()).when(userRepository).save(any(User.class));

        // when
        final User user = userService.join(new JoinReqDto(email, password, name));

        // then
        assertThat(user.getEmail()).isNotNull();
        assertThat(user.getEmail()).isEqualTo(email);
    }

    private User user() {
        return User.builder()
                .email(email)
                .name(name)
                .password(bCryptPasswordEncoder.encode(password))
                .oauth_type(JoinType.NATIVE)
                .deleted(false)
                .recentDate(null)
                .godCount(2)
                .serialGodCount(2)
                .info("hi")
                .build();
    }

    // 회원정보 불러오기
    @Test
    void getUserInfo() {
        // given
        doReturn(Optional.of(user())).when(userRepository).findById(any(UUID.class));

        // when
        UUID seq = UUID.randomUUID();
        final UserInfoResDto userInfoResDto = userService.getUserInfo(seq);

        //then
        assertThat(userInfoResDto.getEmail()).isNotNull();
        assertThat(userInfoResDto.getEmail()).isEqualTo(email);
        assertThat(userInfoResDto.getName()).isEqualTo(name);
    }

    // 회원정보 수정
    @Test
    void setUserInfo() {
        // given
        doReturn(Optional.of(user())).when(userRepository).findById(any(UUID.class));
        ChangeUserInfoReqDto changeUserInfoReqDto = changeUserInfo();

        // when
        UUID seq = UUID.randomUUID();
        userService.setUserInfo(seq, changeUserInfoReqDto);

        //then
        final User changeUser = userRepository.findById(seq).get();
        assertThat(changeUser.getName()).isNotNull();
        assertThat(changeUser.getName()).isEqualTo("changeName");
    }

    private ChangeUserInfoReqDto changeUserInfo() {
        return ChangeUserInfoReqDto.builder()
                .name("changeName")
                .build();
    }

    // 회원 탈퇴
    @Test
    void deleteUser() {
        // given
        doReturn(Optional.of(user())).when(userRepository).findById(any(UUID.class));

        // when
        UUID seq = UUID.randomUUID();
        userService.deleteUser(seq);

        // then
        final User deleteUser = userRepository.findById(seq).get();
        assertThat(deleteUser.getName()).isNotNull();
        assertThat(deleteUser.getName()).isEqualTo("deleteUserName");
        assertThat(deleteUser.getDeleted()).isTrue();
    }

    // 이메일 중복 확인
    @Test
    void duplicatedEmail() {
        // given
        doReturn(null).when(userRepository).findByEmailAndDeletedFalse(any(String.class));

        // when
        Boolean notDuplicated = userService.duplicatedEmail(email);

        //then
        assertThat(notDuplicated).isTrue();
    }

    // 닉네임 중복 확인
    @Test
    void duplicatedName() {
        // given
        doReturn(null).when(userRepository).findByNameAndDeletedFalse(any(String.class));

        // when
        Boolean notDuplicated = userService.duplicatedName(name);

        //then
        assertThat(notDuplicated).isTrue();
    }

    // 비밀번호 변경
    @Test
    void changePW() {
        // given
        doReturn(Optional.of(user())).when(userRepository).findById(any(UUID.class));
        ChangePasswordReqDto changePasswordReqDto = changePasswordReqDto(password, "5678", "5678");

        // when
        UUID seq = UUID.randomUUID();
        Boolean result = userService.changePassword(seq, changePasswordReqDto);

        // then
        assertThat(result).isTrue();
    }

    private ChangePasswordReqDto changePasswordReqDto(String oldPassword, String newPassword, String newPasswordCheck) {
        return ChangePasswordReqDto.builder()
                .oldPassword(oldPassword)
                .newPassword(newPassword)
                .newPasswordCheck(newPasswordCheck)
                .build();
    }

    // 최근 갓생일자, 연속 갓생 일수 조회
    @Test
    void godLife() {
        // given
        doReturn(Optional.of(user())).when(userRepository).findById(any(UUID.class));

        // when
        UUID seq = UUID.randomUUID();
        GodLifeResDto godLifeResDto = userService.getGodLife(seq);

        // then
        assertThat(godLifeResDto).isNotNull();
        assertThat(godLifeResDto.getGodCount()).isEqualTo(2);
    }

    //
}