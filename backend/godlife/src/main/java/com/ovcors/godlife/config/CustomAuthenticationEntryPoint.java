package com.ovcors.godlife.config;

import com.ovcors.godlife.api.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        log.error("UnAuthorized error : {}", e.getMessage());
        String exception = (String) request.getAttribute("exception");

        if("token expired".equals(exception)) {
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(ErrorCode.EXPIRED_TOKEN.getStatus().value());
            response.getWriter().println("{ \"message\" : \"" + exception
                    + "\", \"code\" : \"" + ErrorCode.EXPIRED_TOKEN.getStatus().value()
                    + "\", \"status\" : " + ErrorCode.EXPIRED_TOKEN.getMessage()
                    + ", \"errors\" : [ ] }");
        }
        // response에 넣기
        else {
            setResponse(response, exception);
        }
    }

    private void setResponse(HttpServletResponse response, String exception) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().println("{ \"message\" : \"" + exception
                + "\", \"code\" : \"" + HttpStatus.UNAUTHORIZED.value()
                + "\", \"status\" : " + HttpStatus.UNAUTHORIZED.name()
                + ", \"errors\" : [ ] }");
    }
}
