package com.ovcors.godlife.config.oauth.provider.kakao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Slf4j
@RequiredArgsConstructor
@Component
public class OAuthClient {

    private final WebClient webClient;

    public KakaoOAuthResponse getInfo(String accessToken) {
        KakaoOAuthResponse response = webClient.post()
                .uri("https://kapi.kakao.com/v2/user/me?secure_resource=false")
//                .headers(h-> h.setBearerAuth(accessToken))
//                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .retrieve()
                .onStatus(HttpStatus::is4xxClientError, clientResponse -> Mono.error(new IllegalArgumentException("액세스토큰실패")))
                .onStatus(HttpStatus::is5xxServerError, clientResponse -> Mono.error(new IllegalArgumentException("로그인증실패")))
                .bodyToMono(KakaoOAuthResponse.class)
                .block();

//        return new KaKaoOAuthResponse();
        return response;
    }
}