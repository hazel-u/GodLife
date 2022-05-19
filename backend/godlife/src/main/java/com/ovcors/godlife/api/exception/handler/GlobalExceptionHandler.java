package com.ovcors.godlife.api.exception.handler;

import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorResponseEntity;
import com.ovcors.godlife.api.exception.notification.NotificationManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @Autowired
    private NotificationManager notificationManager;

    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException e, HttpServletRequest req) {
        log.error("handleDataException throw Exception : {}", e.getErrorCode());
        return ErrorResponseEntity.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity exceptionTest(Exception e, HttpServletRequest req) {
        e.printStackTrace();
        log.error("handleDataException throw Exception : {}", e.getMessage());
        notificationManager.sendNotification(e, req.getRequestURI(), getParams(req));

        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append("/n");
        }
        return params.toString();
    }
}
