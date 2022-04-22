package com.ovcors.godlife.api.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    /* 400 BAD_REQUEST : 잘못된 요청 */
    FAIL_MESSAGE_SEND(HttpStatus.BAD_REQUEST, "메세지 전송에 실패하였습니다."),
    NOT_MATCH_PASSWORD(HttpStatus.BAD_REQUEST, "새 비밀번호와 새 비밀번호 확인의 값이 일치하지 않습니다."),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "권한 정보가 없는 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 Token입니다."),
    WRONG_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 불일치합니다."),

    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 사용자를 찾을 수 없습니다."),
    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "요청 헤더에 토큰이 없습니다."),
    BINGO_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 빙고의 사용자를 찾을 수 없습니다."),
    GOALS_NOT_FOUND(HttpStatus.NOT_FOUND, "목표가 존재하지 않습니다"),
    /* 409 : CONFLICT : Resource의 현재 상태와 충돌. 보통 중복된 데이터 존재 */
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "데이터가 이미 존재합니다.")

    ;


    private final HttpStatus status;
    private final String message;
}
