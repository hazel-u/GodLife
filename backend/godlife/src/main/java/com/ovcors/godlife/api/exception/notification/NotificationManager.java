package com.ovcors.godlife.api.exception.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotificationManager {
    @Autowired
    private MatterMostSender mmSender;

    public void sendNotification(Exception e, String uri, String params) {
        mmSender.sendMessage(e, uri, params);
    }

}