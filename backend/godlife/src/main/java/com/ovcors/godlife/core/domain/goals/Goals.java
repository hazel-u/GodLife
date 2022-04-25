package com.ovcors.godlife.core.domain.goals;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Goals {

    @Id
    @GeneratedValue
    private Long seq;
    private String content;
    private Category category;


}
