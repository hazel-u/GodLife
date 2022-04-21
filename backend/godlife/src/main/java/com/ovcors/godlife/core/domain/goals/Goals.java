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

    public enum Category {
        건강한삶, 미라클모닝, 자기개발, 삶의질, 습관개선, 환경
    }
}
