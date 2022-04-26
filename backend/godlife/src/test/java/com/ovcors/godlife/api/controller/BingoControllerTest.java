package com.ovcors.godlife.api.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.google.gson.Gson;
import com.ovcors.godlife.api.dto.request.SaveBingoReqDto;
import com.ovcors.godlife.api.dto.request.SaveCommentReqDto;
import com.ovcors.godlife.api.service.BingoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class BingoControllerTest {

    @InjectMocks
    private BingoController bingoController;

    @Mock
    private BingoService bingoService;

    private final String url = "/bingo";
    private MockMvc mockMvc;
    private Gson gson;
    private String jwtToken = JWT.create()
            .withClaim("email", "wjddma1214@gmail.com")
            .sign(Algorithm.HMAC512("123456"));

    @BeforeEach
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(bingoController)
                .build();
        gson = new Gson();
    }

    @Test
    public void findAllByUser() throws Exception {
        // given
        // when
        ResultActions resultActions = mockMvc.perform(get(url+"/{page}/{limit}", 0, 1)
                        .header("Authorization", "Bearer" + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        resultActions.andExpect(status().isOk());
    }

    @Test
    public void findByCode() throws Exception {
        // given
        // when
        ResultActions resultActions = mockMvc.perform(get(url+"/{code}", 1L)
                .header("Authorization", "Bearer" + jwtToken)
                .contentType(MediaType.APPLICATION_JSON));

        // then
        resultActions.andExpect(status().isOk());
        verify(bingoService, times(1)).findBingo(1L);
    }

    @Test
    public void createBingo() throws Exception {
        // given
        SaveBingoReqDto reqDto = SaveBingoReqDto.builder()
                .title("hello world")
                .build();
        // when
        ResultActions resultActions = mockMvc.perform(post(url)
                .header("Authorization", "Bearer" + jwtToken)
                .content(gson.toJson(reqDto))
                .contentType(MediaType.APPLICATION_JSON));

        // then
        resultActions.andExpect(status().isOk());
        verify(bingoService, times(1)).createBingo(any(), eq(reqDto));
    }

    @Test
    public void addComment() throws Exception {
        // given
        UUID id = UUID.randomUUID();
        SaveCommentReqDto reqDto = SaveCommentReqDto.builder()
                .content("hello world")
                .build();
        // when
        ResultActions resultActions = mockMvc.perform(post(url+"/{seq}/comment", id.toString())
                .header("Authorization", "Bearer" + jwtToken)
                .content(gson.toJson(reqDto))
                .contentType(MediaType.APPLICATION_JSON));

        // then
        resultActions.andExpect(status().isOk());
        verify(bingoService, times(1)).addComment(eq(id.toString()), eq(reqDto));
    }
}