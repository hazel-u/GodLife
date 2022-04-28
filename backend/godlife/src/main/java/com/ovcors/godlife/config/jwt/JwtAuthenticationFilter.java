package com.ovcors.godlife.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ovcors.godlife.api.dto.request.LoginReqDto;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.config.auth.PrincipalDetails;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private final AuthenticationManager authenticationManager;
    private final String secret;
    private UserRepository userRepository;
    private RedisTemplate redisTemplate;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, String secret, UserRepository userRepository, RedisTemplate redisTemplate) {
        super("/user/login");
        this.authenticationManager = authenticationManager;
        this.secret = secret;
        this.userRepository = userRepository;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        try {
            ObjectMapper om = new ObjectMapper();
            LoginReqDto loginReqDto = om.readValue(request.getInputStream(), LoginReqDto.class);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken); // 여기서 PrincipalDetailsService 진입

//            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            return authentication;
        } catch (BadCredentialsException e) {
            sendErrorResponse(response, "BadCredentialException");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private void sendErrorResponse(HttpServletResponse response, String message) throws IOException {
        // Todo: ErrorCode만들어지면 주석 해제
        response.setCharacterEncoding("UTF-8");
        response.setStatus(ErrorCode.USER_NOT_FOUND.getStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().println("{ \"message\" : \"" + message
                + "\", \"code\" : \"" + ErrorCode.USER_NOT_FOUND.getStatus().value()
                + "\", \"status\" : " + ErrorCode.USER_NOT_FOUND.getStatus().name()
                + ", \"errors\" : [ ] }");
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        // Access Token 발급
        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", principalDetails.getUser().getSeq().toString())
                .withClaim("email", principalDetails.getUser().getEmail())
                .sign(Algorithm.HMAC512(secret));

        // Refresh Token 발급
        String refreshToken = JWT.create()
                .withSubject(principalDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME))
                .withClaim("email", principalDetails.getUser().getEmail())
                .sign(Algorithm.HMAC512(secret));

        // Refresh Token - Redis에 저장
        redisTemplate.opsForValue()
                        .set(principalDetails.getUser().getEmail(), refreshToken, JwtProperties.REFRESH_EXPIRATION_TIME, TimeUnit.MILLISECONDS);

        System.out.println("success!! -> " + jwtToken);
        // response의 header로 Access Token 보내기
        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        // response의 header로 Refresh Token 보내기
        response.addHeader(JwtProperties.REFRESH_TOKEN_HEADER_STRING, JwtProperties.TOKEN_PREFIX + refreshToken);
    }
}
