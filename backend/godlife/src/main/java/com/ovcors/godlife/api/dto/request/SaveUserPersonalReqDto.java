package com.ovcors.godlife.api.dto.request;

import com.ovcors.godlife.core.domain.user.PersonalityType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SaveUserPersonalReqDto {
    PersonalityType type;
}
