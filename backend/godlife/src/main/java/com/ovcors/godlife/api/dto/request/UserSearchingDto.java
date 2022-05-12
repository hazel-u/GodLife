package com.ovcors.godlife.api.dto.request;

import com.ovcors.godlife.core.domain.bingo.Bingo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSearchingDto {

    @NotNull
    String keyword;

}
