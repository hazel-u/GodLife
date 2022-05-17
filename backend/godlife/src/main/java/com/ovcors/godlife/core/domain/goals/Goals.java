package com.ovcors.godlife.core.domain.goals;

import com.ovcors.godlife.core.domain.user.User;
import lombok.*;

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
    private Boolean deleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_seq")
    private User user;


    @Builder
    public Goals(String content, Boolean deleted, Category category, User user) {
        this.content = content;
        this.deleted = deleted;
        this.category = category;
        this.user = user;
    }

    public void deleteCustomGoal() {
        this.deleted = true;
    }
}
