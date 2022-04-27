package com.ovcors.godlife.api.controller;

import com.google.gson.Gson;
import com.ovcors.godlife.api.service.OAuthService;
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

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class OAuthControllerTest {

    @InjectMocks
    private OAuthController oAuthController;

    @Mock
    private OAuthService oAuthService;

    private MockMvc mockMvc;
    private Gson gson;

    @BeforeEach
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(oAuthController)
                .build();
        gson = new Gson();
    }

    @Test
    public void mockMvcIsNotNull() throws Exception {
        assertThat(oAuthController).isNotNull();
        assertThat(mockMvc).isNotNull();
    }

    @Test
    public void googleLogin() throws Exception {
        // given
        final String url = "/oauth/google";

        // when
        Map<String, Object> data = new HashMap<>();
        Map<String, String> attribute = new HashMap<>();
        attribute.put("googleId", "google453242");
        attribute.put("email", "google@gmail.com");
        attribute.put("name", "googleTest");
        attribute.put("imageUrl", "testImg");
        data.put("profileObj", attribute);
        final ResultActions resultActions = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .content(gson.toJson(data))
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        resultActions.andExpect(status().isOk());
    }
}
