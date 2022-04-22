package com.ovcors.godlife.api.resolver;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.config.jwt.JwtProperties;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Slf4j
@RequiredArgsConstructor
@Component
public class AuthHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {

    @Autowired
    private final UserRepository userRepository;

    @Value("${spring.jwt.secret}")
    public String secret;


    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        // annotaion 있어야 함. 타입이 맞아야 함. @Auth User user
        boolean hasAnnotation = parameter.getParameterAnnotation(Auth.class) != null;
        boolean isUser = parameter.getParameterType().equals(User.class);

        return hasAnnotation && isUser;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        System.out.println("@Auth 진입");
        String token = webRequest.getHeader(JwtProperties.HEADER_STRING);
        if (token != null) {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC512(secret)).build(); // issuer?
            handleError(token);
            DecodedJWT decodedJWT = verifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, ""));
            String email = decodedJWT.getSubject();
            User user = userRepository.findByEmailAndDeletedFalse(email);
            if(user == null) {
                throw new CustomException(ErrorCode.USER_NOT_FOUND);
            }
            return user;
        } else {
            throw new CustomException(ErrorCode.TOKEN_NOT_FOUND);
        }
    }

    public void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secret))
                .build();

        try {
            verifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        } catch (InvalidClaimException ex) {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        } catch (SignatureGenerationException ex) {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw new CustomException(ErrorCode.EXPIRED_TOKEN);
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
