package com.ovcors.godlife.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import com.ovcors.godlife.config.auth.PrincipalDetails;
import com.ovcors.godlife.core.domain.user.User;
import com.ovcors.godlife.core.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;
    private String secret;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, String secret) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.secret = secret;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);

        if(header==null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        try {
            String token = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
            String email = JWT.require(Algorithm.HMAC512(secret)).build().verify(token)
                    .getClaim("email").asString();

            if(email != null) {
                System.out.println(email+" -> 로그인 시도");
                User user = userRepository.findByEmailAndDeletedFalse(email);

                if(user == null) {
                    throw new CustomException(ErrorCode.USER_NOT_FOUND);
                }
                PrincipalDetails principalDetails = new PrincipalDetails(user);

                Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (TokenExpiredException e) {
            request.setAttribute("exception", "token expired");
        } catch(JWTDecodeException e) {
            request.setAttribute("exception", "wrong token");
        } catch(CustomException e) {
            request.setAttribute("exception", "user not found");
        }
        chain.doFilter(request, response);
    }
}
