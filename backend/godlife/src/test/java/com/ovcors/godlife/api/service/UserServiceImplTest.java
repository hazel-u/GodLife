package com.ovcors.godlife.api.service;

import com.ovcors.godlife.GodlifeApplication;
import com.ovcors.godlife.api.dto.request.JoinReqDto;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.core.domain.user.JoinType;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    BCryptPasswordEncoder bCryptPasswordEncoder;

    private final String email = "userEmail";
    private final String password = "1234";
    private final String name = "테스트계정";

    @Test
    void joinFail_emailDuplicated() {
        // given
        doReturn(User.builder().build()).when(userRepository).findByEmailAndDeletedFalse(email);

        // when
        final CustomException result = assertThrows(CustomException.class, () -> userService.join(new JoinReqDto("userEmail", "1234", "테스트계정")));

        // then
        assertThat(result.getErrorCode().getHttpStatus()).isEqualTo(ErrorCode.DUPLICATE_RESOURCE.getHttpStatus());
    }

    @Test
    void joinFail_nameDuplicated() {
        // given
        doReturn(User.builder().email(email).password(password).name(name).build()).when(userRepository).findByNameAndDeletedFalse(name);

        // when
        final CustomException result = assertThrows(CustomException.class, () -> userService.join(new JoinReqDto("userEmail", "1234", "테스트계정")));

        // then
        assertThat(result.getErrorCode().getHttpStatus()).isEqualTo(ErrorCode.DUPLICATE_RESOURCE.getHttpStatus());
    }

    @Test
    void joinSuccess() {
        // given
        doReturn(null).when(userRepository).findByEmailAndDeletedFalse(email);
        doReturn(user()).when(userRepository).save(any(User.class));

        // when
        final User user = userService.join(new JoinReqDto(email, password, name));
        System.out.println(user);
        // then
        assertThat(user.getEmail()).isNotNull();
        assertThat(user.getEmail()).isEqualTo(email);
    }

    private User user() {
        return User.builder()
                .email(email)
                .name(name)
                .password(password)
                .oauth_type(JoinType.NATIVE)
                .deleted(false)
                .recentDate(null)
                .godCount(0)
                .build();
    }
}