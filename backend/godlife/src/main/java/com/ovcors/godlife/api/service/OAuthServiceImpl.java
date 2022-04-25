package com.ovcors.godlife.api.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.ovcors.godlife.api.dto.response.GoogleLoginResDto;
import com.ovcors.godlife.config.jwt.JwtProperties;
import com.ovcors.godlife.config.oauth.provider.GoogleOAuthUserInfo;
import com.ovcors.godlife.config.oauth.provider.GoogleUser;
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
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${spring.jwt.secret}")
    public String secret;

    @Override
    public GoogleLoginResDto googleLogin(Map<String, Object> data) {
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

        GoogleLoginResDto googleLoginResDto = getToken(userEntity, newUser);

        return googleLoginResDto;
    }

    public GoogleLoginResDto getToken(User userEntity, boolean newUser) {
        // Access Token 발급
        String jwtToken = JWT.create()
                .withSubject(userEntity.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", userEntity.getSeq().toString())
                .withClaim("email", userEntity.getEmail())
                .sign(Algorithm.HMAC512(secret));

        // Refresh Token 발급
        GoogleLoginResDto googleLoginResDto = new GoogleLoginResDto(jwtToken, null, newUser);

        return googleLoginResDto;
    }
}
