package com.ovcors.godlife.api.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
public class SimpleUserInfoResDto {
    private String name;
    private String info;
    private int serialGodCount;
    private int godCount;

    @Builder
    public SimpleUserInfoResDto (String name, String info, int serialGodCount, int godCount) {
        this.name = name;
        this.info = info;
        this.serialGodCount = serialGodCount;
        this.godCount = godCount;
    }
}
