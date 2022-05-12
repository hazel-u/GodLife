package com.ovcors.godlife.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class FindUserResDto {
    private String name;
    private int serialGodCount;
    private int godCount;
    private boolean isFollowing;
}
