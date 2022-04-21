package com.ovcors.godlife.api.exception.notification;

import com.google.gson.Gson;
import com.ovcors.godlife.api.exception.CustomException;
import com.ovcors.godlife.api.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class MatterMostSender {
    @Value("${notification.mattermost.enabled}")
    private boolean mmEnabled;
    @Value("${notification.mattermost.webhook-url}")
    private String webhookUrl;

    private final RestTemplate restTemplate;
    private final MatterMostProperties.MattermostProperties mmProperties;

    public void sendMessage(Exception excpetion, String uri, String params) {
        if (!mmEnabled)
            return;

        try {
            MatterMostMessageDto.Attachment attachment = MatterMostMessageDto.Attachment.builder()
                    .channel(mmProperties.getChannel())
                    .authorIcon(mmProperties.getAuthorIcon())
                    .authorName(mmProperties.getAuthorName())
                    .color(mmProperties.getColor())
                    .pretext(mmProperties.getPretext())
                    .title(mmProperties.getTitle())
                    .text(mmProperties.getText())
                    .footer(mmProperties.getFooter())
                    .build();

            attachment.addExceptionInfo(excpetion, uri, params);
            MatterMostMessageDto.Attachments attachments = new MatterMostMessageDto.Attachments(attachment);
            attachments.addProps(excpetion);
            String payload = new Gson().toJson(attachments);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);
            restTemplate.postForEntity(webhookUrl, entity, String.class);

        } catch (Exception e) {
            throw new CustomException(ErrorCode.FAIL_MESSAGE_SEND);
        }
    }
}
