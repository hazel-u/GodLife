package com.ovcors.godlife.api.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ovcors.godlife.api.dto.request.KakaoLoginReqDto;
import com.ovcors.godlife.api.dto.response.OAuthLoginResDto;
import com.ovcors.godlife.config.jwt.JwtProperties;
import com.ovcors.godlife.config.oauth.provider.google.GoogleOAuthUserInfo;
import com.ovcors.godlife.config.oauth.provider.google.GoogleUser;
import com.ovcors.godlife.config.oauth.provider.kakao.KakaoOAuthResponse;
import com.ovcors.godlife.config.oauth.provider.kakao.OAuthClient;
import com.ovcors.godlife.core.domain.user.JoinType;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Map;

@Service
@Transactional
public class OAuthServiceImpl implements OAuthService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    OAuthClient oAuthClient;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${spring.jwt.secret}")
    public String secret;

    @Override
    public OAuthLoginResDto googleLogin(Map<String, Object> data) {
        GoogleOAuthUserInfo googleUser = new GoogleUser((Map<String, Object>) data.get("profileObj"));

        User userEntity = userRepository.findByEmailAndDeletedFalse(googleUser.getEmail());

        boolean newUser = false;

        if(userEntity == null) {
            User userRequest = User.builder()
                    .email(googleUser.getEmail())
                    .password(bCryptPasswordEncoder.encode("godLifeGoogleUserPassword4324235487"))
                    .name(googleUser.getName())
                    .oauth_type(JoinType.GOOGLE)
                    .deleted(false)
                    .recentDate(null)
                    .godCount(0)
                    .build();

            userEntity = userRepository.save(userRequest);
            newUser = true;
        }

        OAuthLoginResDto googleLoginResDto = getToken(userEntity, newUser);

        return googleLoginResDto;
    }


    @Override
    public OAuthLoginResDto kakaoLogin(KakaoLoginReqDto kakaoLoginReqDto) {
        // kakao에 접근해서 유저 프로필 끌어옴
        KakaoOAuthResponse profile = oAuthClient.getInfo(kakaoLoginReqDto.getAccessToken());
        User userEntity = userRepository.findByEmailAndDeletedFalse(profile.getOAuthEmail());

        // 로그인 로직
        boolean newUser = false;
        if(userEntity == null) {
            User requestUser = User.builder()
                    .email(profile.getOAuthEmail())
                    .password(bCryptPasswordEncoder.encode("godLifeKakaoLoginUserPW78123487"))
                    .name(profile.getOAuthNickname())
                    .oauth_type(JoinType.KAKAO)
                    .deleted(false)
                    .recentDate(null)
                    .godCount(0)
                    .build();
            userEntity = userRepository.save(requestUser);
            newUser = true;
        }

        OAuthLoginResDto kakaoLoginResDto = getToken(userEntity, newUser);

        return kakaoLoginResDto;
    }

    public OAuthLoginResDto getToken(User userEntity, boolean newUser) {
        // Access Token 발급
        String jwtToken = JWT.create()
                .withSubject(userEntity.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", userEntity.getSeq().toString())
                .withClaim("email", userEntity.getEmail())
                .sign(Algorithm.HMAC512(secret));

        // Refresh Token 발급
        OAuthLoginResDto googleLoginResDto = new OAuthLoginResDto(JwtProperties.TOKEN_PREFIX+jwtToken, null, newUser);

        return googleLoginResDto;
    }
}
