package com.ovcors.godlife.api.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.gson.Gson;
import com.ovcors.godlife.api.dto.request.*;
import com.ovcors.godlife.api.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    private MockMvc mockMvc;
    private Gson gson;

    private String jwtToken = JWT.create()
            .withClaim("email", "test@naver.com")
            .sign(Algorithm.HMAC512("123456"));

    @BeforeEach
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .build();
        gson = new Gson();
    }

    @Test
    public void mockMvcIsNotNull() throws Exception {
        assertThat(userController).isNotNull();
        assertThat(mockMvc).isNotNull();
    }

    @Test
    public void successJoin() throws Exception {
        // given
        final String url = "/user/join";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .content(gson.toJson(joinRequest("testEmail", "1234", "테스트")))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }

    private JoinReqDto joinRequest(final String email, final String password, final String name) {
        return JoinReqDto.builder()
                .email(email)
                .password(password)
                .name(name)
                .build();
    }

    // 회원정보 조회
    @Test
    public void getUserInfo() throws Exception {
        // given
        final String url = "/user/info";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .header("Authorization", "Bearer "+jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }

    // 회원정보 수정
    @Test
    public void setUserInfo() throws Exception {
        // given
        final String url = "/user/info";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .header("Authorization", "Bearer "+jwtToken)
                        .content(gson.toJson(changeUserInfoReqDto("changeEmail")))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }

    private ChangeUserInfoReqDto changeUserInfoReqDto(String name) {
        return ChangeUserInfoReqDto.builder()
                .name(name)
                .build();
    }

    // 회원 탈퇴
    @Test
    public void deleteUser() throws Exception {
        // given
        final String url = "/user/";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.delete(url)
                        .header("Authorization", "Bearer "+jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }

    // 이메일 중복 체크
    @Test
    public void duplicatedEmail() throws Exception {
        // given
        final String url = "/user/duplicate-email";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .content(gson.toJson(duplicatedEmailReqDto("checkEmail")))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }

    public DuplicatedEmailReqDto duplicatedEmailReqDto(String email) {
        return DuplicatedEmailReqDto.builder()
                .email(email)
                .build();
    }

    // 닉네임 중복 체크
    @Test
    public void duplicatedName() throws Exception {
        // given
        final String url = "/user/duplicate-name";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .content(gson.toJson(duplicatedNameReqDto("checkName")))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }

    public DuplicatedNameReqDto duplicatedNameReqDto(String name) {
        return DuplicatedNameReqDto.builder()
                .name(name)
                .build();
    }

    // 비밀번호 변경
    @Test
    public void changePW() throws Exception {
        // given
        final String url = "/user/change-pw";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .header("Authorization", "Bearer "+jwtToken)
                        .content(gson.toJson(changePasswordReqDto("1234","5678","5678")))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }

    private ChangePasswordReqDto changePasswordReqDto(String oldPassword, String newPassword, String newPasswordCheck) {
        return ChangePasswordReqDto.builder()
                .oldPassword(oldPassword)
                .newPassword(newPassword)
                .newPasswordCheck(newPasswordCheck)
                .build();
    }

    // JWT 갱신


    // 최근 갓생일자, 연속 갓생 일수 조회
    @Test
    public void getGodLife() throws Exception{
        // given
        final String url = "/user/god-life";

        // when
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.get(url)
                        .header("Authorization", "Bearer "+jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }
}