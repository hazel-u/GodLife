package com.ovcors.godlife.api.service;

import com.ovcors.godlife.api.dto.response.OAuthLoginResDto;
import com.ovcors.godlife.core.domain.user.JoinType;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class OAuthServiceTest {

    @InjectMocks
    private OAuthServiceImpl oAuthService;

    @Mock
    private UserRepository userRepository;

    @Spy
    BCryptPasswordEncoder bCryptPasswordEncoder;


    private final String googleEmail = "google@gmail.com";

    private User googleUser() {
        User user = User.builder()
                .email(googleEmail)
                .name("google")
                .password(bCryptPasswordEncoder.encode("google"))
                .oauth_type(JoinType.GOOGLE)
                .deleted(false)
                .recentDate(null)
                .godCount(2)
                .build();
        user.setSeq();

        return user;
    }

    @Test
    void googleLogin() {
        // given
        doReturn(googleUser()).when(userRepository).findByEmailAndDeletedFalse(any(String.class));
        ReflectionTestUtils.setField(oAuthService, "secret", "12345");

        // when
        Map<String, Object> data = new HashMap<>();
        Map<String, String> attribute = new HashMap<>();
        attribute.put("providerId", "google453242");
        attribute.put("provider", "google");
        attribute.put("email", "google@gmail.com");
        attribute.put("name", "googleTest");
        attribute.put("imageUrl", "testImg");
        data.put("profileObj", attribute);
        final OAuthLoginResDto googleLoginResDto = oAuthService.googleLogin(data);

        // then
        assertThat(googleLoginResDto).isNotNull();
    }
}
